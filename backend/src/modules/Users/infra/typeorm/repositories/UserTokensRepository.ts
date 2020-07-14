import { getRepository, Repository } from 'typeorm';
import IUserTokensRepository from '@modules/Users/repositories/IUserTokensRepository';

import UserToken from '../entities/UserToken';

class UsersTokenRepository implements IUserTokensRepository {
  private ormRepositorie: Repository<UserToken>;

  constructor() {
    this.ormRepositorie = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepositorie.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepositorie.create({
      user_id,
    });

    await this.ormRepositorie.save(userToken);

    return userToken;
  }
}

export default UsersTokenRepository;
