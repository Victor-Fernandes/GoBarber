import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import ProvidersController from '../Controllers/ProvidersController';
import ProviderMonthAvailabilityController from '../Controllers/ProviderMonthAvaiability';
import ProviderDayAvailabilityController from '../Controllers/ProviderDayAvaiability';

const providersRouter = Router();
const providersController = new ProvidersController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();

providersRouter.use(ensureAuthenticated);

providersRouter.get('/', providersController.index);

providersRouter.get(
  '/:id/month-availability',
  providerMonthAvailabilityController.index
);

providersRouter.get(
  '/:id/day-availability',
  providerDayAvailabilityController.index
);

export default providersRouter;
