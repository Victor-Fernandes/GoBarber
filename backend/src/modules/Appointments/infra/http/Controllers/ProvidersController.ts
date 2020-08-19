import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProvidersService from '@modules/Appointments/services/ListProvidersService';
import { classToClass } from 'class-transformer';

class ProvidersController {
  async index(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const listProvider = container.resolve(ListProvidersService);

    const providers = await listProvider.execute({
      user_id,
    });

    return response.json(classToClass(providers));
  }
}

export default ProvidersController;
