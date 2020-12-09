import { Request, Response, Router } from 'express';
import { ExtendedRequest } from '../interfaces/http/requests/ExtendedRequest';

import {
  postCreateUnit,
  postPromoteUnitById,
  getUnitById,
  getAllUserUnits,
  getAllUnits,
  deleteUnitById,
} from '../controllers/unit.controller';
import validationMiddleware from '../middlewares/validation.middleware';
import unitValidator from '../validators/unit.validator';

const unitRouter = Router();

unitRouter.post('/create', validationMiddleware(unitValidator.create, 'body'), (req: Request, res: Response) =>
  postCreateUnit(req as ExtendedRequest, res)
);
unitRouter.post('/promote/:id', validationMiddleware(unitValidator.promote, 'body'), (req: Request, res: Response) =>
  postPromoteUnitById(req as ExtendedRequest, res)
);

unitRouter.get('/all', (req: Request, res: Response) => getAllUserUnits(req as ExtendedRequest, res));
unitRouter.get('/all-dev', (req: Request, res: Response) => getAllUnits(req as ExtendedRequest, res));
unitRouter.get('/:id', validationMiddleware(unitValidator.getById, 'params'), (req: Request, res: Response) =>
  getUnitById(req as ExtendedRequest, res)
);

unitRouter.delete('/:id', validationMiddleware(unitValidator.deleteById, 'params'), (req: Request, res: Response) =>
  deleteUnitById(req as ExtendedRequest, res)
);

export default unitRouter;
