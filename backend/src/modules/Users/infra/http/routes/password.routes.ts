/* eslint-disable no-shadow */
import { Router } from 'express';

import ForgotPasswordController from '../Controllers/ForgotPasswordController';
import ResetPasswordController from '../Controllers/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post('/forgot', forgotPasswordController.create);
passwordRouter.post('/reset', resetPasswordController.create);

export default passwordRouter;
