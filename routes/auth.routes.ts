import { Request, Response, Router } from 'express';
import { postSignUp, postLogin } from '../controllers/auth.controller';

const router = Router();

router.post('/signup', (req: Request, res: Response) => postSignUp(req, res));
router.post('/login', (req: Request, res: Response) => postLogin(req, res));

const authRouter = router;

export default authRouter;
