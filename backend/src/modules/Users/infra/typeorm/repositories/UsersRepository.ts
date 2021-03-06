import { getRepository, Repository, Not } from 'typeorm';
import IUsersRepository from '@modules/Users/repositories/IUsersRepositories';
import ICreateUserDTO from '@modules/Users/dtos/ICreateUserDTO';
import IFindAllProviderDTO from '@modules/Users/dtos/IFindAllProvidersDTO';
import User from '../entities/User';

/** Repositorio de Users especifico para o typeorm */

class UsersRepository implements IUsersRepository {
  private ormRepositorie: Repository<User>;

  constructor() {
    this.ormRepositorie = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepositorie.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepositorie.findOne({
      where: { email },
    });

    return user;
  }

  public async findAllProviders({
    except_user_id,
  }: IFindAllProviderDTO): Promise<User[]> {
    let users: User[];

    if (except_user_id) {
      users = await this.ormRepositorie.find({
        where: {
          id: Not(except_user_id),
        },
      });
    } else {
      users = await this.ormRepositorie.find();
    }

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepositorie.create(userData);

    await this.ormRepositorie.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepositorie.save(user);
  }
}

export default UsersRepository;
