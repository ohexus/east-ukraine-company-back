import { Response, Router } from 'express';
import ExtendedRequest from '../../interfaces/requests/ExtendedRequest';

import {
  postCreateUserLooting,
  postFinishUserLooting,
  postUpdateTimeLeft,
  getAllUserLootings,
  getAllStartedUserLootings,
  getUserLootingById,
} from '../../controllers/lootings/userLooting.controller';

const router = Router();

router.post('/create', (req: ExtendedRequest, res: Response) =>
  postCreateUserLooting(req, res),
);
router.post('/finish', (req: ExtendedRequest, res: Response) =>
  postFinishUserLooting(req, res),
);

router.post('/update-time', (req: ExtendedRequest, res: Response) =>
  postUpdateTimeLeft(req, res),
);

router.get('/all', (req: ExtendedRequest, res: Response) =>
  getAllUserLootings(req, res),
);
router.get('/started', (req: ExtendedRequest, res: Response) =>
  getAllStartedUserLootings(req, res),
);
router.get('/:id', (req: ExtendedRequest, res: Response) =>
  getUserLootingById(req, res),
);

const userLootingRouter = router;

export default userLootingRouter;
