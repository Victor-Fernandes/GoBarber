import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProviderDayAvailabilityService from '@modules/Appointments/services/ListProviderDayAvailabilityService';

class ProviderDayAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, year, month } = request.query;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService
    );

    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day: Number(day),
      year: Number(month),
      month: Number(year),
    });

    return response.json(availability);
  }
}

export default ProviderDayAvailabilityController;
