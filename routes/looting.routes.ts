import { Response, Router } from 'express';
import ExtendedRequest from '../interfaces/http/requests/ExtendedRequest';

import {
  postCreateLooting,
  postFinishLooting,
  postUpdateTimeLeft,
  getAllLootingsByUser,
  getAllStartedLootingsByUser,
  getLootingById,
} from '../controllers/looting.controller';

const router = Router();

router.post('/create', (req: ExtendedRequest, res: Response) => postCreateLooting(req, res));
router.post('/finish', (req: ExtendedRequest, res: Response) => postFinishLooting(req, res));

router.post('/update-time', (req: ExtendedRequest, res: Response) => postUpdateTimeLeft(req, res));

router.get('/all', (req: ExtendedRequest, res: Response) => getAllLootingsByUser(req, res));
router.get('/started', (req: ExtendedRequest, res: Response) => getAllStartedLootingsByUser(req, res));
router.get('/:id', (req: ExtendedRequest, res: Response) => getLootingById(req, res));

const lootingRouter = router;

export default lootingRouter;
