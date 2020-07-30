import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/Appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, year, month } = request.body;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService
    );

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day,
      year,
      month,
    });

    return response.json(availability);
  }
}

export default ProviderDayAvailabilityController;
