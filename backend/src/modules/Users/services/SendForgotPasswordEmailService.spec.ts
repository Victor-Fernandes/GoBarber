// import AppError from '@shared/error/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fake/FakeUsersRespository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

// cria uma categoria para os testes
describe('CreateUser', () => {
  it('should be able to recover the pasword using the email', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider
    );

    await fakeUserRepository.create({
      name: 'teste',
      email: 'usertest@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'usertest@test.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
});
