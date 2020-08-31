import { Response, Router } from 'express';
import ExtendedRequest from '../interfaces/requests/ExtendedRequest';
import {
  postCreateUnit,
  getAllUnitsByUser,
  getAllUnits,
} from '../controllers/unit.controller';

const router = Router();

router.post('/create', (req: ExtendedRequest, res: Response) =>
  postCreateUnit(req, res),
);

router.get('/all', (req: ExtendedRequest, res: Response) =>
  getAllUnitsByUser(req, res),
);
router.get('/all-dev', (req: ExtendedRequest, res: Response) =>
  getAllUnits(req, res),
);

const unitRouter = router;

export default unitRouter;
