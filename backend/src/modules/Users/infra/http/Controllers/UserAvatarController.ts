import { Request, Response } from 'express';

import UpdateUserAvatarService from '@modules/Users/services/UpdateUserAvatarService';
import { container } from 'tsyringe';

class UserAvatarController {
  async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });

    delete user.password;

    return response.json({ user });
  }
}

export default UserAvatarController;
