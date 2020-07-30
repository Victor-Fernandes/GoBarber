import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProvidersAppointmentService from '@modules/Appointments/services/ListProvidersAppointmentService';

class ProviderAppointmentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.body;

    const listProviderAppointments = container.resolve(
      ListProvidersAppointmentService
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day,
      month,
      year,
    });

    return response.json(appointments);
  }
}

export default ProviderAppointmentsController;
