import winston from 'winston';
import { format } from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';

const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const logger = winston.createLogger({
  levels: logLevels,
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
    new ElasticsearchTransport({
      level: 'info',
      indexPrefix: 'my-app-logs',
      clientOpts: { node: 'http://localhost:9200' },
    }),
  ],
});

export { logger };
