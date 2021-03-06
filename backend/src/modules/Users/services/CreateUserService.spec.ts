import AppError from '@shared/error/AppError';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeHashProvider from '../providers/Hashprovider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRespository';
import CreateUserService from './CreateUserService';

// cria uma categoria para os testes
let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();
    createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
      fakeCacheProvider
    );
  });
  it('should be create a new user', async () => {
    const user = await createUser.execute({
      name: 'user test',
      email: 'usertest@test.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    await createUser.execute({
      name: 'user test',
      email: 'usertest@test.com',
      password: '123456',
    });

    expect(
      createUser.execute({
        name: 'user test',
        email: 'usertest@test.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
