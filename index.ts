import express, { Application } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import config from 'config';
import log4js from 'log4js';

import { LOGS } from './constants';
import { connectDB } from './utils';

import appRouter from './routes';

const app: Application = express();

const isProduction: boolean = (process.env.NODE_ENV || config.get('NODE_ENV')) === 'production';

const dbConnection = connectDB();
const logger = log4js.getLogger();

logger.level = process.env.LOGGER_LVL || config.get('LOGGER_LVL');

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

if (!dbConnection) {
  throw new Error(LOGS.ERROR.DB.CONNECTION);
}

if (!isProduction) {
  mongoose.set('debug', true);
}

app.use('/', appRouter);

// start server
const PORT = process.env.PORT || config.get('PORT');
app.listen(PORT, () => {
  console.log('Listening on port ' + PORT);
});
