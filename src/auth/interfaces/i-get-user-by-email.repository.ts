import { User } from '../../entities/user.entity';

export interface IGetUserByEmailRepository {
  execute(email: string): Promise<User | null>;
}
