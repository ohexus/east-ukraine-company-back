import { Response, Router } from 'express';
import ExtendedRequest from '../interfaces/requests/ExtendedRequest';
import {
  postCreateUnit,
  postPromoteUnitById,
  getUnitById,
  getAllUserUnits,
  getAllUnits,
  deleteUnitById,
  deleteUnitsDB,
} from '../controllers/unit.controller';

const router = Router();

router.post('/create', (req: ExtendedRequest, res: Response) =>
  postCreateUnit(req, res),
);
router.post('/promote/:id', (req: ExtendedRequest, res: Response) =>
  postPromoteUnitById(req, res),
);

router.get('/all', (req: ExtendedRequest, res: Response) =>
  getAllUserUnits(req, res),
);
router.get('/all-dev', (req: ExtendedRequest, res: Response) =>
  getAllUnits(req, res),
);
router.get('/:id', (req: ExtendedRequest, res: Response) =>
  getUnitById(req, res),
);

router.delete('/clearUnitsDB', (req: ExtendedRequest, res: Response) =>
  deleteUnitsDB(req, res),
);
router.delete('/:id', (req: ExtendedRequest, res: Response) =>
  deleteUnitById(req, res),
);

const unitRouter = router;

export default unitRouter;
