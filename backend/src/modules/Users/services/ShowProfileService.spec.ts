import AppError from '@shared/error/AppError';

import FakeUsersRepository from '../repositories/fake/FakeUsersRespository';
import ShowProfileService from './ShowProfileService';

// cria uma categoria para os testes
let fakeUserRepository: FakeUsersRepository;
let showProfileService: ShowProfileService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    showProfileService = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'user test',
      email: 'usertest@test.com',
      password: '123456',
    });

    const profile = await showProfileService.execute({
      user_id: user.id,
    });
    expect(profile.name).toBe('user test');
    expect(profile.email).toBe('usertest@test.com');
  });

  it('it should not be able to show the profile from non-existing user', async () => {
    await expect(
      showProfileService.execute({
        user_id: 'fake id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
