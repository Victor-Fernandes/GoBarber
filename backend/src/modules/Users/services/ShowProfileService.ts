import { injectable, inject } from 'tsyringe';

import AppError from '@shared/error/AppError';
import User from '@modules/Users/infra/typeorm/entities/User';

import IUsersRepositories from '../repositories/IUsersRepositories';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepositories
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('user not found');
    }

    return user;
  }
}

export default ShowProfileService;
