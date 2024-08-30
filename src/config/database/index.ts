import dotenv from 'dotenv';
import { Options } from 'sequelize';

// Load environment variables from .env file
dotenv.config();

interface DbConfig {
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbHost: string;
  options: Options;
}

// Define the configuration object
const config: DbConfig = {
  dbName: process.env.DB_NAME || '',
  dbUser: process.env.DB_USER || '',
  dbPassword: process.env.DB_PASSWORD || '',
  dbHost: process.env.DB_HOST || 'localhost',
  options: {
    dialect: 'mysql',
    logging: false,
  },
};

// Export the configuration
export default config;
