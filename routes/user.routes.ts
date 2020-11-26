import { Router, Request, Response } from 'express';

import { getCurrentUser, getUserById, getAllUsers, deleteUserById } from '../controllers/user.controller';
import validationMiddleware from '../middlewares/validation.middleware';
import userValidator from '../validators/user.validator';

// import multer from 'multer';

const userRouter = Router();

// const upload = multer({ dest: 'uploads/' });

// userRouter.patch('/:id/updateAvatar', upload.single('avatar'), (req: Request, res: Response) => updateAvatar(req, res));

userRouter.get('/all', (req: Request, res: Response) => getAllUsers(req, res));

userRouter.get('/me', (req: Request, res: Response) => getCurrentUser(req, res));

userRouter.get('/:id', validationMiddleware(userValidator.getById, 'params'), (req: Request, res: Response) =>
  getUserById(req, res)
);
userRouter.delete('/:id', validationMiddleware(userValidator.deleteById, 'params'), (req: Request, res: Response) =>
  deleteUserById(req, res)
);

export default userRouter;
