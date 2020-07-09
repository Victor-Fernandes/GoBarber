import AppError from '@shared/error/AppError';

import FakeHashProvider from '../providers/Hashprovider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRespository';
import CreateUserService from './CreateUserService';

// cria uma categoria para os testes
describe('CreateUser', () => {
  it('should be create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'user test',
      email: 'usertest@test.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

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
