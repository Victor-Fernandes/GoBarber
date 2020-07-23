import { injectable, inject } from 'tsyringe';

import User from '@modules/Users/infra/typeorm/entities/User';

import IUsersRepositories from '@modules/Users/repositories/IUsersRepositories';

interface IRequest {
  user_id: string;
}

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepositories
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      except_user_id: user_id,
    });

    return users;
  }
}

export default ShowProfileService;
