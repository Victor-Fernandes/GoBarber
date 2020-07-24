import { getRepository, Repository, Raw } from 'typeorm';
import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/Appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '@modules/Appointments/dtos/IFindAllInMonthFromProviderDTO';
import Appointment from '../entities/Appointment';

/** Repositorio de Appointments especifico para o typeorm */

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepositorie: Repository<Appointment>;

  constructor() {
    this.ormRepositorie = getRepository(Appointment);
  }

  public async findAllInMonthFromProvider({
    provider_id,
    month,
    year,
  }: IFindAllInMonthFromProviderDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepositorie.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
        ),
      },
    });

    return appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepositorie.findOne({
      where: date,
    });

    return findAppointment || undefined;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepositorie.create({ provider_id, date });

    await this.ormRepositorie.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
