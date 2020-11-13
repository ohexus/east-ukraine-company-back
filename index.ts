import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from 'config';
import log4js from 'log4js';

import { LOGS } from './constants';
import { connectDB } from './utils';

import authMiddleware from './middlewares/auth.middleware';

import authRouter from './routes/auth.routes';
import userRouter from './routes/user.routes';
import unitRouter from './routes/unit.routes';
import lootingRouter from './routes/looting.routes';

const app: Application = express();

const isProduction: boolean = !!(process.env.PRODUCTION || config.get('PRODUCTION'));

const dbConnection = connectDB();
const logger = log4js.getLogger();

logger.level = process.env.LOGGER_LVL || config.get('LOGGER_LVL');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

if (!dbConnection) {
  throw new Error(LOGS.ERROR.DB_CONNECTION);
}

if (!isProduction) {
  mongoose.set('debug', true);
}

app.use('/avatars', express.static('assets/images/avatars'));

app.use('/api/auth', authRouter);

app.use(authMiddleware);

app.use('/api/user', userRouter);
app.use('/api/unit', unitRouter);
app.use('/api/looting', lootingRouter);

// start server

const PORT = process.env.PORT || config.get('PORT');
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
