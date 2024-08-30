import 'dotenv/config';
import validateEnv from './utils/validateEnv';
import App from './app';
import AnalyticsRoute from './routes/analytics.routes';
import EventRoute from './routes/event.routes';
validateEnv();

const app = new App(
  [new AnalyticsRoute(), new EventRoute()],
  Number(process.env.PORT)
);

app.listen();
