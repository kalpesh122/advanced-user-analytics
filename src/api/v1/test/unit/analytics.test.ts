import { Request, Response } from 'express';
import AnalyticsController from '../../controllers/analytics.controller';
import AnalyticsService from '../../services/analytics.service';
import HttpException from '../../utils/exceptions/http.exception';

jest.mock('../../services/analytics.service');

describe('AnalyticsController', () => {
  let analyticsController: AnalyticsController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    analyticsController = new AnalyticsController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  describe('getAnalyticsReport', () => {
    it('should return 400 if user_id is not provided', async () => {
      mockRequest.params = {};

      await analyticsController.getAnalyticsReport(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(expect.any(HttpException));
      expect(nextFunction.mock.calls[0][0]).toBeInstanceOf(HttpException);
      expect((nextFunction.mock.calls[0][0] as HttpException).status).toBe(400);
      expect((nextFunction.mock.calls[0][0] as HttpException).message).toBe(
        'User ID is required'
      );
    });

    it('should return analytics report for a valid user_id', async () => {
      mockRequest.params = { user_id: '123' };

      const mockPageViews = 100;
      const mockMostClickedButton = 'Submit';
      const mockAverageTimeSpent = 300;

      jest
        .spyOn(AnalyticsService.prototype, 'getPageViewsForUser')
        .mockResolvedValue(mockPageViews);
      jest
        .spyOn(AnalyticsService.prototype, 'getMostClickedButton')
        .mockResolvedValue(mockMostClickedButton);
      jest
        .spyOn(AnalyticsService.prototype, 'getAverageTimeOnPage')
        .mockResolvedValue(mockAverageTimeSpent);

      await analyticsController.getAnalyticsReport(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        data: {
          pageViews: mockPageViews,
          mostClickedButton: mockMostClickedButton,
          averageTimeSpent: mockAverageTimeSpent,
        },
      });
    });

    it('should call analytics service methods with correct user_id', async () => {
      const userId = '123';
      mockRequest.params = { user_id: userId };

      const getPageViewsSpy = jest
        .spyOn(AnalyticsService.prototype, 'getPageViewsForUser')
        .mockResolvedValue(0);
      const getMostClickedButtonSpy = jest
        .spyOn(AnalyticsService.prototype, 'getMostClickedButton')
        .mockResolvedValue('');
      const getAverageTimeSpentSpy = jest
        .spyOn(AnalyticsService.prototype, 'getAverageTimeOnPage')
        .mockResolvedValue(0);

      await analyticsController.getAnalyticsReport(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(getPageViewsSpy).toHaveBeenCalledWith(userId);
      expect(getMostClickedButtonSpy).toHaveBeenCalled();
      expect(getAverageTimeSpentSpy).toHaveBeenCalledWith(userId);
    });
  });
});
