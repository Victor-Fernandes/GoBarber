import { sign } from 'jsonwebtoken';
import AppError from '@shared/error/AppError';
import authConfig from '@config/auth';
import User from '@modules/Users/infra/typeorm/entities/User';
import { injectable, inject } from 'tsyringe';
import IHashProvider from '../providers/Hashprovider/models/IHashProvider';
import IUsersRepositories from '../repositories/IUsersRepositories';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserServer {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepositories,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id, // saber qual usuario gerou esse token
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserServer;
