import { Response, Router } from 'express';
import ExtendedRequest from '../interfaces/requests/ExtendedRequest';
import {
  postCreateUnit,
  postPromoteUnit,
  getUnitById,
  getAllUnitsByUser,
  getAllUnits,
  postClearUnitsDB,
} from '../controllers/unit.controller';

const router = Router();

router.post('/create', (req: ExtendedRequest, res: Response) =>
  postCreateUnit(req, res),
);
router.post('/promote', (req: ExtendedRequest, res: Response) =>
  postPromoteUnit(req, res),
);

router.get('/all', (req: ExtendedRequest, res: Response) =>
  getAllUnitsByUser(req, res),
);
router.get('/all-dev', (req: ExtendedRequest, res: Response) =>
  getAllUnits(req, res),
);
router.get('/:id', (req: ExtendedRequest, res: Response) =>
  getUnitById(req, res),
);

router.post('/clearUnitsDB', (req: ExtendedRequest, res: Response) =>
  postClearUnitsDB(req, res),
);

const unitRouter = router;

export default unitRouter;
