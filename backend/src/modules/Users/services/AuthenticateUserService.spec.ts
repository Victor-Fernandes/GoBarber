import AppError from '@shared/error/AppError';

import FakeUsersRepository from '../repositories/fake/FakeUsersRespository';
import FakeHashProvider from '../providers/Hashprovider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

// cria uma categoria para os testes
describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'Teste do teste',
      email: 'usertest@test.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: 'usertest@test.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user ', async () => {
    expect(
      authenticateUser.execute({
        email: 'usertest@test.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'Teste do teste',
      email: 'usertest@test.com',
      password: '123456',
    });

    expect(
      authenticateUser.execute({
        email: 'usertest@test.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
