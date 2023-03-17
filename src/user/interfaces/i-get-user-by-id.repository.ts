import { User } from '../../entities/user.entity';

export interface IGetUserByIdRepository {
  execute(userId: string): Promise<User | null>;
}
