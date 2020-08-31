import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from 'config';
import log4js from 'log4js';

import { connectDB } from './utils';

import authMiddleware from './middlewares/auth.middleware';

import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import unitRouter from './routes/unit.routes';

const app: express.Application = express();

const { PORT } = config.get('SERVER');

const isProduction: boolean = !!(
  process.env.PRODUCTION || config.get('isProduction')
);

const dbConnection = connectDB();
const logger = log4js.getLogger();

logger.level = config.get('LOGGER_LVL');

app.use(cors());
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

app.use('/api/user/', userRouter);
app.use('/api/unit/', unitRouter);

// start server
app.listen(process.env.PORT || PORT, () => {
  console.log('Listening on port ' + PORT);
});
