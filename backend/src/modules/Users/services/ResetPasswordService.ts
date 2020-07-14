import { inject, injectable } from 'tsyringe';
// import User from '@modules/Users/infra/typeorm/entities/User';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/error/AppError';
import IUsersRepositories from '../repositories/IUsersRepositories';
import IUserTokensRepositories from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/Hashprovider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepositories,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepositories,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exist.');
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token has expired.');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
