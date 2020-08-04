/* eslint-disable no-shadow */
import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../Controllers/AppointmentsController';
import ProviderAppointmentsController from '../Controllers/ProviderAppointmentController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const providerAppointmentController = new ProviderAppointmentsController();

appointmentsRouter.use(ensureAuthenticated);

// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();

//   return response.json(appointments);
// });

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      provider_id: Joi.string().uuid().required(),
      date: Joi.date(),
    },
  }),
  appointmentsController.create
);
appointmentsRouter.get('/me', providerAppointmentController.index);

export default appointmentsRouter;
