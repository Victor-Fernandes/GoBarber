/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProvidersAppointmentService from './ListProvidersAppointmentService';

// cria uma categoria para os testes
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderAppointmentService: ListProvidersAppointmentService;

describe('ListProvidersAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderAppointmentService = new ListProvidersAppointmentService(
      fakeAppointmentsRepository
    );
  });

  it('it should be able to list the appointments on a especific day', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    });

    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    });

    const appointments = await listProviderAppointmentService.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    });

    expect(appointments).toEqual([appointment1, appointment2]);
  });
});
