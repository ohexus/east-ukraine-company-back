import mongoose from 'mongoose';
import config from 'config';

import { LOGS } from '../constants';

import log4js from 'log4js';
const logger = log4js.getLogger();

const { MONGO_URI } = config.get('DB');

export default async function connectDB(): Promise<typeof mongoose | null> {
  try {
    const connection: typeof mongoose = await mongoose.connect(
      process.env.MONGO_URI || MONGO_URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
      },
    );
    logger.info(LOGS.DB.CONNECTION_SUCCESS);
    return connection;
  } catch (error) {
    logger.error(error.message);
    return null;
  }
}
