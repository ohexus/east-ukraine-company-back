import { Response, Router } from 'express';
import ExtendedRequest from '../interfaces/requests/ExtendedRequest';

import {
  postCreateLooting,
  getAllLootings,
  getLootingById,
  getRandomLooting,
} from '../controllers/looting.controller';

const router = Router();

router.post('/create', (req: ExtendedRequest, res: Response) =>
  postCreateLooting(req, res),
);

router.get('/all', (req: ExtendedRequest, res: Response) =>
  getAllLootings(req, res),
);
router.get('/:id', (req: ExtendedRequest, res: Response) =>
  getLootingById(req, res),
);
router.get('/random', (req: ExtendedRequest, res: Response) =>
  getRandomLooting(req, res),
);

const lootingRouter = router;

export default lootingRouter;
