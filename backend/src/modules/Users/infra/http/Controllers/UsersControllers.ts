import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUsersService from '@modules/Users/services/CreateUserService';

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { name, email, password } = request.body;

      const createUser = container.resolve(CreateUsersService);

      const user = await createUser.execute({
        name,
        email,
        password,
      });

      delete user.password; // deletar o password da response

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default UsersController;
