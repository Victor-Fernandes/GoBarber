import { uuid } from 'uuidv4';
// Remover td que tenha conexao com o banco de dados
import IAppointmentsRepository from '@modules/Appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/Appointments/dtos/ICreateAppointmentDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

/** Repositorio de Appointments especifico para o typeorm */

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findByDate = this.appointments.find(
      appointment => appointment.date === date
    );

    return findByDate;
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
