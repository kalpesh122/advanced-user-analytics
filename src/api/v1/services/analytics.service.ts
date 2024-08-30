import MySQLConnection from '../models/connect';

class AnalyticsService {
  private dbService: MySQLConnection;

  constructor() {
    this.dbService = MySQLConnection.getInstance();
  }

  public async getPageViewsForUser(
    userId: string,
    days: number = 7
  ): Promise<number> {
    const query = `
      SELECT COUNT(*) as total_views
      FROM track_event
      WHERE user_id = '${userId}'
        AND event_type = 'page_view'
        AND timestamp >= DATE_SUB(NOW(), INTERVAL '${days}' DAY)
    `;
    const result = await this.dbService.executeQuery(query);

    return result[0]?.total_views || 0;
  }

  public async getMostClickedButton(hours: number = 24): Promise<string> {
    const query = `
      SELECT button_name, COUNT(*) as click_count
      FROM track_event
      WHERE event_type = 'button_click'
        AND timestamp >= DATE_SUB(NOW(), INTERVAL '${hours}' HOUR)
      GROUP BY button_name
      ORDER BY click_count DESC
      LIMIT 1
    `;
    const result = await this.dbService.executeQuery(query);
    console.log(result, 'sdf');
    return result[0]?.button_name || 'No button clicks recorded';
  }

  public async getAverageTimeOnPage(userId: string): Promise<number> {
    const query = `
      SELECT AVG(time_diff) as avg_time
      FROM (
        SELECT 
          TIMESTAMPDIFF(SECOND, t1.timestamp, t2.timestamp) as time_diff
        FROM track_event t1
        JOIN track_event t2 ON t1.user_id = t2.user_id
          AND t1.event_type = 'page_view'
          AND t2.event_type = 'page_view'
          AND t1.timestamp < t2.timestamp
        WHERE t1.user_id = '${userId}'
        AND NOT EXISTS (
          SELECT 1 FROM track_event t3
          WHERE t3.user_id = t1.user_id
            AND t3.event_type = 'page_view'
            AND t3.timestamp > t1.timestamp
            AND t3.timestamp < t2.timestamp
        )
      ) as time_diffs
    `;
    const result = await this.dbService.executeQuery(query);
    return result[0]?.avg_time || 0;
  }

  public async generateAnalyticsReport(userId: string): Promise<object> {
    const pageViews = await this.getPageViewsForUser(userId);
    const mostClickedButton = await this.getMostClickedButton();
    const avgTimeOnPage = await this.getAverageTimeOnPage(userId);

    return {
      user_id: userId,
      total_page_views_last_7_days: pageViews,
      most_clicked_button_last_24_hours: mostClickedButton,
      average_time_on_page: avgTimeOnPage,
    };
  }
}

export default AnalyticsService;
