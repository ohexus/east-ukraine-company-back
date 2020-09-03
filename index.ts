import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from 'config';
import log4js from 'log4js';

import { connectDB } from './utils';

import authMiddleware from './middlewares/auth.middleware';

import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import unitRouter from './routes/unit.routes';
import lootingRouter from './routes/looting.routes';

const app: Application = express();

const { PORT } = config.get('SERVER');

const isProduction: boolean = !!(
  process.env.PRODUCTION || config.get('isProduction')
);

const dbConnection = connectDB();
const logger = log4js.getLogger();

logger.level = config.get('LOGGER_LVL');

app.use(
  cors({
    origin: isProduction
      ? 'https://east-ukraine-company.herokuapp.com'
      : config.get('ORIGIN_URI'),
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

if (!dbConnection) {
  //   return;
}

if (!isProduction) {
  mongoose.set('debug', true);
}

app.use('/api/auth', authRouter);

app.use(authMiddleware);

app.use('/api/user', userRouter);
app.use('/api/unit', unitRouter);
app.use('/api/looting', lootingRouter);

// start server
app.listen(process.env.PORT || PORT, () => {
  console.log('Listening on port ' + PORT);
});
