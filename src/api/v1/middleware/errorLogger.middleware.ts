import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logging/logger';

const errorLogger = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(err.message);
  next(err);
};

export default errorLogger;
