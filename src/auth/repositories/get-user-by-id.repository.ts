import { User } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetUserByIdRepository } from '../interfaces/i-get-user-by-id.repository';

@Injectable()
export class GetUserByIdRepository implements IGetUserByIdRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(userId: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
