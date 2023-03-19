import { User } from '../../entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetUserByIdRepository } from '../interfaces';

@Injectable()
export class GetUserByIdRepository implements IGetUserByIdRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(userId: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ id: userId });
  }
}
