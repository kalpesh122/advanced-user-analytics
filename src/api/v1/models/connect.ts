import { Sequelize, QueryTypes } from 'sequelize';
import config from '../../../config/database';

class MySQLConnection {
  public static instance: MySQLConnection;
  public sequelize: Sequelize;

  public constructor() {
    this.sequelize = new Sequelize({
      database: config.dbName,
      username: config.dbUser,
      password: config.dbPassword,
      host: 'localhost',
      port: 3306,
      dialect: 'mysql',
      logging: false,
      pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
  }

  public static getInstance(): MySQLConnection {
    if (!MySQLConnection.instance) {
      MySQLConnection.instance = new MySQLConnection();
    }
    return MySQLConnection.instance;
  }

  public async connect(): Promise<void> {
    try {
      await this.sequelize.authenticate();

      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the MySQL database:', error);
    }
  }

  public async syncAlterations(): Promise<void> {
    try {
      await this.sequelize.sync({ alter: true });
      console.log('Synced all database changes successfully.');
    } catch (error) {
      console.error('Unable to sync to the MySQL database:', error);
    }
  }

  public async close(): Promise<void> {
    try {
      await this.sequelize.close();
      console.log('Database connection closed.');
    } catch (error) {
      console.error('Error closing the database connection:', error);
    }
  }

  public async executeQuery<T = any>(
    query: string,
    params: any[] = []
  ): Promise<T[]> {
    try {
      const results = await this.sequelize.query(query, {
        replacements: params,
        type: QueryTypes.SELECT,
      });
      return results as T[];
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }
}

export default MySQLConnection;
