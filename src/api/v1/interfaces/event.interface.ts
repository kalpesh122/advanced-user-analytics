// Event Interface
export interface IEvent {
  id?: number;
  event_type: 'page_view' | 'button_click';
  user_id: string;
  page_url?: string | null;
  button_name?: string | null;
  timestamp?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
