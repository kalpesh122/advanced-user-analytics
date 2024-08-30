import { Router } from 'express';
import EventController from '../controllers/event.controller';
import validationMiddleware from '../middleware/validation.middleware';
import { eventValidationSchema } from '../validations/event.validation';

class EventRoute {
  public path = '/events';
  public router = Router();
  private eventController = new EventController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/track`,
      validationMiddleware(eventValidationSchema),
      this.eventController.trackEvent
    );
  }
}

export default EventRoute;
