import express, { Router } from 'express';

import authMiddleware from '../middlewares/auth.middleware';

import authRouter from './auth.routes';
import lootingRouter from './looting.routes';
import unitRouter from './unit.routes';
import userRouter from './user.routes';

const appRouter = Router();

appRouter.use('/avatars', express.static('assets/images/avatars'));

appRouter.use('/api/auth', authRouter);

appRouter.use(authMiddleware);

appRouter.use('/api/user', userRouter);
appRouter.use('/api/unit', unitRouter);
appRouter.use('/api/looting', lootingRouter);

export default appRouter;
