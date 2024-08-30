import { Request, Response, NextFunction, RequestHandler } from 'express';

/**
 * Async handler middleware.
 * @param fn The asynchronous function to be wrapped.
 * @returns The middleware function.
 */
const asyncHandler =
  <T>(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<T>
  ): RequestHandler =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const result = await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };

export default asyncHandler;
