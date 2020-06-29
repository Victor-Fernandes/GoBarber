/* eslint-disable no-shadow */
import { Router } from 'express';

import AuthenticateUserService from '@modules/Users/services/AuthenticateUserService';
import UsersRepository from '@modules/Users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();

  const authenticateUser = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUser.execute({
    email,
    password,
  });

  return response.json({ user, token });
});

export default sessionsRouter;
