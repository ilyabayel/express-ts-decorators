import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import {AppRouter} from './controllers/app-router';
import './controllers/auth.controller';
import './controllers/root.controller';
import './controllers/protected.controller';

const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({keys: ['key']}));
app.use(AppRouter.instance);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
