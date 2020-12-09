import { Router } from 'express';

import moneyRouter from './money.routes';
import profileRouter from './profile.routes';

const userRouter = Router();

userRouter.use('/', profileRouter);
userRouter.use('/money', moneyRouter);

export default userRouter;
