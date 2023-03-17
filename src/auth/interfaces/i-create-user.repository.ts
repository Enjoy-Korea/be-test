import { User } from '../../entities/user.entity';

export interface CreateUserRepositoryInputDto {
  email: string;
  password: string;
}

export interface ICreateUserRepository {
  execute(params: CreateUserRepositoryInputDto): Promise<User>;
}
