import { User } from '../../entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetUserByEmailRepository } from '../interfaces';

@Injectable()
export class GetUserByEmailRepository implements IGetUserByEmailRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }
}
