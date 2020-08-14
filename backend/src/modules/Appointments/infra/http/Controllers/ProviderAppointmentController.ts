import { Request, Response } from 'express';

import { container } from 'tsyringe';
import ListProvidersAppointmentService from '@modules/Appointments/services/ListProvidersAppointmentService';
import { classToClass } from 'class-transformer';

class ProviderAppointmentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;
    const { day, month, year } = request.query;

    const listProviderAppointments = container.resolve(
      ListProvidersAppointmentService
    );

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: Number(day),
      year: Number(month),
      month: Number(year),
    });

    return response.json(classToClass(appointments));
  }
}

export default ProviderAppointmentsController;
