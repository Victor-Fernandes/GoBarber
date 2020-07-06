import IUsersRepository from '@modules/Users/repositories/IUsersRepositories';
import ICreateUserDTO from '@modules/Users/dtos/ICreateUserDTO';
import { uuid } from 'uuidv4';
import User from '../../infra/typeorm/entities/User';

/** Repositorio de Users especifico para o typeorm */

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findById(id: string): Promise<User | undefined> {
    const findById = this.users.find(user => user.id === id);

    return findById;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findByEmail = this.users.find(user => user.email === email);

    return findByEmail;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() }, userData);

    this.users.push(user);
    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default UsersRepository;
