import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/Appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/error/AppError';
import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';

interface IRequest {
  date: Date;
  user_id: string;
  provider_id: string;
}
@injectable() // indica que a classe pode receber injeção de dependencia
class CreateAppointmentService {
  // declarando como o parametro que o constructor vai receber como private,
  // cria a variavel de forma automatica para ser usada dentro da classe
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is alredy booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
