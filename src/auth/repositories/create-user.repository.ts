import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/user.entity';
import {
  CreateUserRepositoryInputDto,
  ICreateUserRepository,
} from '../interfaces/i-create-user.repository';

@Injectable()
export class CreateUserRepository implements ICreateUserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(params: CreateUserRepositoryInputDto): Promise<User> {
    const { email, password } = params;
    let user = await this.userRepository.create({ email, password });
    user = await this.userRepository.save(user);
    return user;
  }
}
