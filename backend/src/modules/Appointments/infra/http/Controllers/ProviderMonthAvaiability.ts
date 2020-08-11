import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProviderMonthAvailabilityService from '@modules/Appointments/services/ListProviderMonthAvailabilityService';

class ProviderMonthAvailabilityController {
  async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { year, month } = request.body;

    const listProviderMonthAvailability = container.resolve(
      ListProviderMonthAvailabilityService
    );

    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      year,
      month,
    });

    return response.json(availability);
  }
}

export default ProviderMonthAvailabilityController;