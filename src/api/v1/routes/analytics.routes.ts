import { Router } from 'express';
import AnalyticsController from '../controllers/analytics.controller';

class AnalyticsRoute {
  public path = '/analytics';
  public router = Router();
  private analyticsController = new AnalyticsController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/report/:user_id`,
      this.analyticsController.getAnalyticsReport
    );
  }
}

export default AnalyticsRoute;
