import { User } from '../../../entities';

export interface IGetUserByEmailRepository {
  execute(email: string): Promise<User | null>;
}
