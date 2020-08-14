import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import Appointment from '@modules/Appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/error/AppError';
import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationsRepository from '@modules/Notifications/repositories/INotificationsRepository';

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
    private appointmentsRepository: IAppointmentsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
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
      throw new AppError('You can create appointments, between 8am and 5pm');
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is alredy booked');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      user_id,
      date: appointmentDate,
    });

    // olhar documentação do date-fns para ver a formatação da data
    const dateFormated = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm");

    // const appointmenDateFormatted = format(
    //   appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'",
    //   {locale: ptBR}
    // )

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `New appointment for ${dateFormated}`,
    });

    await this.cacheProvider.invalidate(
      `provider-appointmens:${provider_id}:${format(
        appointmentDate,
        'yyyy-M-d'
      )}`
    );

    return appointment;
  }
}

export default CreateAppointmentService;
