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
import validationMiddleware from '../middlewares/validation.middleware';
import unitValidator from '../validators/unit.validator';

const unitRouter = Router();

unitRouter.post('/create', validationMiddleware(unitValidator.create, 'body'), (req: ExtendedRequest, res: Response) =>
  postCreateUnit(req, res)
);
unitRouter.post(
  '/promote/:id',
  validationMiddleware(unitValidator.promote, 'body'),
  (req: ExtendedRequest, res: Response) => postPromoteUnitById(req, res)
);

unitRouter.get('/all', (req: ExtendedRequest, res: Response) => getAllUserUnits(req, res));
unitRouter.get('/all-dev', (req: ExtendedRequest, res: Response) => getAllUnits(req, res));
unitRouter.get('/:id', validationMiddleware(unitValidator.getById, 'params'), (req: ExtendedRequest, res: Response) =>
  getUnitById(req, res)
);

unitRouter.delete('/clearUnitsDB', (req: ExtendedRequest, res: Response) => deleteUnitsDB(req, res));
unitRouter.delete(
  '/:id',
  validationMiddleware(unitValidator.deleteById, 'params'),
  (req: ExtendedRequest, res: Response) => deleteUnitById(req, res)
);

export default unitRouter;
