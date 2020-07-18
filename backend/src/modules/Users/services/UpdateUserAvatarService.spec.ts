import AppError from '@shared/error/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';
import FakeUsersRepository from '../repositories/fake/FakeUsersRespository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

// cria uma categoria para os testes
let fakeUserRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;
describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider
    );
  });
  it('should be create a new user', async () => {
    const user = await fakeUserRepository.create({
      name: 'user test',
      email: 'usertest@test.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existing user', async () => {
    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing user',
        avatarFilename: 'avatar.jpg',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when update a new one', async () => {
    // spyOn > espiona a função que é passada como parametro para ver se e executada
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'user test',
      email: 'usertest@test.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    // toBeCalledWith > é chamado quando o avatar anterior e chamado pela função delete
    expect(deleteFile).toBeCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});
