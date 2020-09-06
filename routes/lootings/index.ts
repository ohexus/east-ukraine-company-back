import { Router } from 'express';

import lootingDataRouter from './lootingData.routes';
import userLootingRouter from './userLooting.routes';

const router = Router();

router.use('/data', lootingDataRouter);
router.use('/', userLootingRouter);

const lootingRouter = router;

export default lootingRouter;
