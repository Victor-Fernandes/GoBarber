import AppError from '@shared/error/AppError';

import FakeHashProvider from '../providers/Hashprovider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRespository';
import UpdateProfileService from './UpdateProfileService';

// cria uma categoria para os testes
let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider
    );
  });

  it('should be able to update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'user test',
      email: 'usertest@test.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'user t3st3',
      email: 't3st3@t3st.com',
    });

    expect(updatedUser.name).toBe('user t3st3');
    expect(updatedUser.email).toBe('t3st3@t3st.com');
  });

  it('it should not be able to update the profile from non-existing user', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'fake id',
        name: 'teste',
        email: 'test@test.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('it should not be able to chance to another user email', async () => {
    await fakeUserRepository.create({
      name: 'test',
      email: 'test@test.com',
      password: '123456',
    });

    const user = await fakeUserRepository.create({
      name: 'user test',
      email: 'usertest@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'user test',
        email: 'test@test.com',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'user test',
      email: 'usertest@test.com',
      password: '123456',
    });

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: 'user t3st3',
      email: 'usert3st@test.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('it should not be able to update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'user test',
      email: 'usertest@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'user t3st3',
        email: 'usert3st@test.com',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('it should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'user test',
      email: 'usertest@test.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'user t3st3',
        email: 'usert3st@test.com',
        old_password: 'wrog-password',
        password: '123123',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
