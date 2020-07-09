import { inject, injectable } from 'tsyringe';
import AppError from '@shared/error/AppError';
import User from '@modules/Users/infra/typeorm/entities/User';

import IHashProvider from '../providers/Hashprovider/models/IHashProvider';
import IUsersRepositories from '../repositories/IUsersRepositories';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepositories,

    @inject('HashProvider')
    private hashProvider: IHashProvider
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExist = await this.usersRepository.findByEmail(email);

    if (checkUserExist) {
      throw new AppError('Email address alredy used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUsersService;
