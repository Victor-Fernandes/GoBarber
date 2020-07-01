/* eslint-disable no-shadow */
import { Router } from 'express';

import SessionsController from '../Controllers/SessionsController';

const sessionsRouter = Router();
const sessionController = new SessionsController();

sessionsRouter.post('/', sessionController.create);

export default sessionsRouter;
