import MySQLConnection from '../models/connect';
import { Event } from '../models/schema/event.model';

interface IEvent {
  event_type: string;
  user_id?: string;
  page_url?: string | null;
  button_name?: string | null;
  timestamp: Date;
}

class EventService {
  public async recordEvent(eventData: Partial<IEvent>): Promise<IEvent> {
    const event = await Event.create({
      event_type: eventData.event_type as 'page_view' | 'button_click',
      user_id: eventData.user_id!,
      page_url: eventData.page_url || null,
      button_name: eventData.button_name || null,
      timestamp: eventData.timestamp || new Date(),
    });

    return event;
  }
}

export default EventService;
