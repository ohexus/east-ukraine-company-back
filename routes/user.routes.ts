import { Router, Request, Response } from 'express';

import { getUserById, getAllUsers } from '../controllers/user.controller';

const router = Router();
// import multer from 'multer';

// const upload = multer({ dest: 'uploads/' });

router.get('/all', (req: Request, res: Response) => getAllUsers(req, res));
router.get('/:id', (req: Request, res: Response) => getUserById(req, res));

// router.patch(
//   '/:id/updateAvatar',
//   upload.single('avatar'),
//   (req: Request, res: Response) => updateAvatar(req, res),
// );

const userRouter = router;

export default userRouter;
