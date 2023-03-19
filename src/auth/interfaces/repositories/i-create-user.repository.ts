import { User } from '../../../entities';

export interface CreateUserRepositoryInputDto {
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  execute(params: CreateUserRepositoryInputDto): Promise<User>;
}
