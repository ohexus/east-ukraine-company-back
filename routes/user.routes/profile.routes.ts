import { Request, Response, Router } from 'express';
import { ExtendedRequest } from '../../interfaces/http/requests/ExtendedRequest';

// import multer from 'multer';
// const upload = multer({ dest: 'uploads/' });

import {
  getCurrentUser,
  getUserById,
  getAllUsers,
  deleteUserById,
} from '../../controllers/user.controller/profile.controller';
import validationMiddleware from '../../middlewares/validation.middleware';
import userValidator from '../../validators/user.validator';

const profileRouter = Router();

profileRouter.get('/all', (req: Request, res: Response) => getAllUsers(req as ExtendedRequest, res));
profileRouter.get('/me', (req: Request, res: Response) => getCurrentUser(req as ExtendedRequest, res));

profileRouter.get('/:id', validationMiddleware(userValidator.getById, 'params'), (req: Request, res: Response) =>
  getUserById(req as ExtendedRequest, res)
);
profileRouter.delete('/:id', validationMiddleware(userValidator.deleteById, 'params'), (req: Request, res: Response) =>
  deleteUserById(req as ExtendedRequest, res)
);

// profileRouter.patch('/:id/updateAvatar', upload.single('avatar'), (req: Request, res: Response) => updateAvatar(req as ExtendedRequest, res));

export default profileRouter;
