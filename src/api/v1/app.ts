import express, { Application } from 'express';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import Route from './utils/interfaces/route.interface';
import ErrorMiddleware from './middleware/error.middleware';
import helmet from 'helmet';
import requestLogger from './middleware/requestLogger.middleware';
import errorLogger from './middleware/errorLogger.middleware';
import { Sequelize } from 'sequelize-typescript';
import { Event } from './models/schema/event.model';

class App {
  public express: Application;
  public port: number;
  private sequelize!: Sequelize;

  constructor(routes: Route[], port: number) {
    this.express = express();
    this.port = port;

    this.initializeDatabaseConnection();
    this.initializeMiddleware();
    this.initializeRoutes(routes);
    this.initializeErrorHandling();
  }

  private async initializeDatabaseConnection(): Promise<void> {
    try {
      this.sequelize = new Sequelize({
        database: process.env.DB_NAME,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
        models: [Event],
      });

      await this.sequelize.authenticate();
      console.log('Connection has been established successfully.');

      // Sync models with database
      await this.sequelize.sync({ alter: false });
      console.log('Database synchronized');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
      process.exit(1);
    }
  }

  private initializeMiddleware(): void {
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan('dev'));
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
    this.express.use(requestLogger);
    this.express.use(errorLogger);
  }

  private initializeRoutes(routes: Route[]): void {
    routes.forEach((route: Route) => {
      this.express.use('/api/v1', route.router);
    });
  }

  private initializeErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }

  public async close(): Promise<void> {
    if (this.sequelize) {
      await this.sequelize.close();
      console.log('Database connection closed');
    }
  }
}

export default App;
