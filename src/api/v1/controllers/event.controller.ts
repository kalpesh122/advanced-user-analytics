import { Request, Response, NextFunction } from 'express';
import asyncHandler from '../middleware/async.middleware';
import EventService from '../services/event.service';
import HttpException from '../utils/exceptions/http.exception';

class EventController {
  private eventService: EventService;

  constructor() {
    this.eventService = new EventService();
  }

  public trackEvent = asyncHandler(
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      const { event_type, user_id, page_url, button_name } = req.body;

      if (!event_type || !user_id) {
        return next(new HttpException(400, 'Missing required fields'));
      }

      // Validate event_type
      if (!['page_view', 'button_click'].includes(event_type)) {
        return next(new HttpException(400, 'Invalid event type'));
      }

      // Validate button_name if event_type is 'button_click'
      if (event_type === 'button_click' && !button_name) {
        return next(
          new HttpException(
            400,
            'button_name is required for button_click events'
          )
        );
      }

      // Validate page_url if event_type is 'page_view'
      if (event_type === 'page_view' && !page_url) {
        return next(
          new HttpException(400, 'page_url is required for page_view events')
        );
      }

      const event = await this.eventService.recordEvent({
        event_type,
        user_id,
        page_url,
        button_name,
        timestamp: new Date(),
      });

      res.status(201).json({
        success: true,
        message: 'Event tracked successfully',
        data: event,
      });
    }
  );
}

export default EventController;
