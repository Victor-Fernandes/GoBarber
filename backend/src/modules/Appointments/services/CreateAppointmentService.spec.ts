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
});
