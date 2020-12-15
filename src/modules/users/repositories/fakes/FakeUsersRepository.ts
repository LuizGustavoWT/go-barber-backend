import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import { v4 as uuid } from 'uuid';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let { users: providers } = this;

    if (except_user_id) {
      providers = providers.filter(user => user.id !== except_user_id);
    }

    return providers;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = await this.users.find(user => user.email === email);

    return findUser;
  }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = await this.users.find(user => user.id === id);

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), avatar: null }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[findIndex] = user;

    return user;
  }
}

export default FakeUsersRepository;
