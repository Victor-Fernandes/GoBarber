import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/Users/services/UpdateProfileService';
import ShowProfileService from '@modules/Users/services/ShowProfileService';

class UpdateProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;

      const showProfile = container.resolve(ShowProfileService);

      const user = await showProfile.execute({ user_id });

      delete user.password;

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name, email, password, old_password } = request.body;

      const updateProfile = container.resolve(UpdateProfileService);

      const user = await updateProfile.execute({
        user_id,
        name,
        email,
        old_password,
        password,
      });

      delete user.password; // deletar o password da response

      return response.json(user);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export default UpdateProfileController;
