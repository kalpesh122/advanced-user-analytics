import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middleware/async.middleware';
import AnalyticsService from '../services/analytics.service';
import HttpException from '../utils/exceptions/http.exception';

class AnalyticsController {
  private analyticsService: AnalyticsService;

  constructor() {
    this.analyticsService = new AnalyticsService();
  }

  public getAnalyticsReport = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { user_id } = req.params;

      if (!user_id) {
        return next(new HttpException(400, 'User ID is required'));
      }

      const pageViews = await this.analyticsService.getPageViewsForUser(
        user_id as string
      );
      const mostClickedButton =
        await this.analyticsService.getMostClickedButton();
      const averageTimeSpent = await this.analyticsService.getAverageTimeOnPage(
        user_id as string
      );

      res.status(200).json({
        success: true,
        data: {
          pageViews,
          mostClickedButton,
          averageTimeSpent,
        },
      });
    }
  );
}

export default AnalyticsController;
