import { inject, injectable } from 'tsyringe';
import AppError from '@shared/error/AppError';
// import User from '@modules/Users/infra/typeorm/entities/User';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepositories from '../repositories/IUsersRepositories';
import IUserTokensRepositories from '../repositories/IUserTokensRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepositories,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UserTokensRepository')
    private userTokenseRepository: IUserTokensRepositories
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exist!');
    }

    await this.userTokenseRepository.generate(user.id);

    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido'
    );
  }
}

export default SendForgotPasswordEmailService;
