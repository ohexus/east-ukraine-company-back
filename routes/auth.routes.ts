import { Request, Response, Router } from 'express';
import { postSignUp, postLogin } from '../controllers/auth.controller';

import validationMiddleware from '../middlewares/validation.middleware';
import authValidator from '../validators/auth.validator';

const authRouter = Router();

authRouter.post('/signup', validationMiddleware(authValidator.signup, 'body'), (req: Request, res: Response) =>
  postSignUp(req, res)
);

authRouter.post('/login', validationMiddleware(authValidator.login, 'body'), (req: Request, res: Response) =>
  postLogin(req, res)
);

export default authRouter;
