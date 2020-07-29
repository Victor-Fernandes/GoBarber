import { startOfHour, isBefore, getHours } from 'date-fns';
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

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment on a past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError('You can create appointments, between 8am and 17pm');
    }

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
