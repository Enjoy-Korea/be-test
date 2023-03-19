import { User } from '../../../entities';

export interface IGetUserByIdRepository {
  execute(userId: string): Promise<User | null>;
}
