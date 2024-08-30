import User from '../../interfaces/event.interface';

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
