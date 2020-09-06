import { Response, Router } from 'express';
import ExtendedRequest from '../../interfaces/requests/ExtendedRequest';

import {
  postCreateLootingData,
  getAllLootingData,
  getLootingDataById,
  getRandomLootingData,
} from '../../controllers/lootings/lootingData.controller';

const router = Router();

router.post('/create', (req: ExtendedRequest, res: Response) =>
  postCreateLootingData(req, res),
);
router.get('/all', (req: ExtendedRequest, res: Response) =>
  getAllLootingData(req, res),
);
router.get('/:id', (req: ExtendedRequest, res: Response) =>
  getLootingDataById(req, res),
);
router.get('/random', (req: ExtendedRequest, res: Response) =>
  getRandomLootingData(req, res),
);

const lootingDataRouter = router;

export default lootingDataRouter;
