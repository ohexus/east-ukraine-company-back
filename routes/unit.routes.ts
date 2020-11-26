import { Response, Router } from 'express';
import ExtendedRequest from '../interfaces/http/requests/ExtendedRequest';
import {
  postCreateUnit,
  postPromoteUnitById,
  getUnitById,
  getAllUserUnits,
  getAllUnits,
  deleteUnitById,
  deleteUnitsDB,
} from '../controllers/unit.controller';

const unitRouter = Router();

unitRouter.post('/create', (req: ExtendedRequest, res: Response) => postCreateUnit(req, res));
unitRouter.post('/promote/:id', (req: ExtendedRequest, res: Response) => postPromoteUnitById(req, res));

unitRouter.get('/all', (req: ExtendedRequest, res: Response) => getAllUserUnits(req, res));
unitRouter.get('/all-dev', (req: ExtendedRequest, res: Response) => getAllUnits(req, res));
unitRouter.get('/:id', (req: ExtendedRequest, res: Response) => getUnitById(req, res));

unitRouter.delete('/clearUnitsDB', (req: ExtendedRequest, res: Response) => deleteUnitsDB(req, res));
unitRouter.delete('/:id', (req: ExtendedRequest, res: Response) => deleteUnitById(req, res));

export default unitRouter;
