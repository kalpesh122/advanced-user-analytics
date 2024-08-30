import { Request, Response } from 'express';
import EventController from '../../controllers/event.controller';
import EventService from '../../services/event.service';
import HttpException from '../../utils/exceptions/http.exception';

jest.mock('../../services/event.service');

describe('EventController', () => {
  let eventController: EventController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    eventController = new EventController();
    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  describe('trackEvent', () => {
    it('should return 400 if event_type is missing', async () => {
      mockRequest.body = { user_id: '123' };

      await eventController.trackEvent(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(expect.any(HttpException));
      expect(nextFunction.mock.calls[0][0]).toBeInstanceOf(HttpException);
      expect((nextFunction.mock.calls[0][0] as HttpException).status).toBe(400);
      expect((nextFunction.mock.calls[0][0] as HttpException).message).toBe(
        'Missing required fields'
      );
    });

    it('should return 400 if user_id is missing', async () => {
      mockRequest.body = { event_type: 'page_view' };

      await eventController.trackEvent(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(expect.any(HttpException));
      expect(nextFunction.mock.calls[0][0]).toBeInstanceOf(HttpException);
      expect((nextFunction.mock.calls[0][0] as HttpException).status).toBe(400);
      expect((nextFunction.mock.calls[0][0] as HttpException).message).toBe(
        'Missing required fields'
      );
    });

    it('should return 400 if event_type is invalid', async () => {
      mockRequest.body = { event_type: 'invalid_type', user_id: '123' };

      await eventController.trackEvent(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(expect.any(HttpException));
      expect(nextFunction.mock.calls[0][0]).toBeInstanceOf(HttpException);
      expect((nextFunction.mock.calls[0][0] as HttpException).status).toBe(400);
      expect((nextFunction.mock.calls[0][0] as HttpException).message).toBe(
        'Invalid event type'
      );
    });

    it('should return 400 if button_name is missing for button_click event', async () => {
      mockRequest.body = { event_type: 'button_click', user_id: '123' };

      await eventController.trackEvent(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(expect.any(HttpException));
      expect(nextFunction.mock.calls[0][0]).toBeInstanceOf(HttpException);
      expect((nextFunction.mock.calls[0][0] as HttpException).status).toBe(400);
      expect((nextFunction.mock.calls[0][0] as HttpException).message).toBe(
        'button_name is required for button_click events'
      );
    });

    it('should return 400 if page_url is missing for page_view event', async () => {
      mockRequest.body = { event_type: 'page_view', user_id: '123' };

      await eventController.trackEvent(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledWith(expect.any(HttpException));
      expect(nextFunction.mock.calls[0][0]).toBeInstanceOf(HttpException);
      expect((nextFunction.mock.calls[0][0] as HttpException).status).toBe(400);
      expect((nextFunction.mock.calls[0][0] as HttpException).message).toBe(
        'page_url is required for page_view events'
      );
    });

    it('should successfully track a page_view event', async () => {
      const mockEvent = {
        event_type: 'page_view',
        user_id: '123',
        page_url: 'https://example.com',
        timestamp: expect.any(Date),
      };
      mockRequest.body = mockEvent;

      jest
        .spyOn(EventService.prototype, 'recordEvent')
        .mockResolvedValue(mockEvent);

      await eventController.trackEvent(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Event tracked successfully',
        data: mockEvent,
      });
    });

    it('should successfully track a button_click event', async () => {
      const mockEvent = {
        event_type: 'button_click',
        user_id: '123',
        button_name: 'submit',
        timestamp: expect.any(Date),
      };
      mockRequest.body = mockEvent;

      jest
        .spyOn(EventService.prototype, 'recordEvent')
        .mockResolvedValue(mockEvent);

      await eventController.trackEvent(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        success: true,
        message: 'Event tracked successfully',
        data: mockEvent,
      });
    });
  });
});
