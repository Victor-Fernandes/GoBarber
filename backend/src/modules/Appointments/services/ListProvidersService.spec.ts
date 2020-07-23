import FakeUsersRepository from '@modules/Users/repositories/fake/FakeUsersRespository';
import ListProvidersService from './ListProvidersService';

// cria uma categoria para os testes
let fakeUserRepository: FakeUsersRepository;
let listProvidersService: ListProvidersService;

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    listProvidersService = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to list the providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'user test 1',
      email: 'usertest1@test.com',
      password: '123456',
    });

    const user2 = await fakeUserRepository.create({
      name: 'user test 2',
      email: 'usertest2@test.com',
      password: '123456',
    });

    const loggedUser = await fakeUserRepository.create({
      name: 'user test',
      email: 'usertest@test.com',
      password: '123456',
    });

    const providers = await listProvidersService.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
