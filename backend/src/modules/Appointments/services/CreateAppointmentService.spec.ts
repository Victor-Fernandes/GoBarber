import AppError from '@shared/error/AppError';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

// cria uma categoria para os testes
describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentService = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentService
    );

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123');
  });

  it('shuld not be able to create two appointments in the same date', async () => {
    const fakeAppointmentService = new FakeAppointmentRepository();
    const createAppointment = new CreateAppointmentService(
      fakeAppointmentService
    );

    const appointmentDate = new Date(2020, 7, 5, 11);

    await createAppointment.execute({
      date: appointmentDate,
      provider_id: '123123',
    });

    expect(
      createAppointment.execute({
        date: appointmentDate,
        provider_id: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
