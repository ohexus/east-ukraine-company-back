import { Request, Response, Router } from 'express';
import { ExtendedRequest } from '../../interfaces/http/requests/ExtendedRequest';

import { getMoney, patchDecreaseMoney, patchIncreaseMoney, patchSetMoney } from '../../controllers/user.controller';
import validationMiddleware from '../../middlewares/validation.middleware';
import moneyValidator from '../../validators/money.validator';

const moneyRouter = Router();

moneyRouter.get('/get', (req: Request, res: Response) => getMoney(req as ExtendedRequest, res));

moneyRouter.patch(
  '/decrease',
  validationMiddleware(moneyValidator.updateAction, 'body'),
  (req: Request, res: Response) => patchDecreaseMoney(req as ExtendedRequest, res)
);
moneyRouter.patch(
  '/increase',
  validationMiddleware(moneyValidator.updateAction, 'body'),
  (req: Request, res: Response) => patchIncreaseMoney(req as ExtendedRequest, res)
);
moneyRouter.patch('/set', validationMiddleware(moneyValidator.updateAction, 'body'), (req: Request, res: Response) =>
  patchSetMoney(req as ExtendedRequest, res)
);

export default moneyRouter;
