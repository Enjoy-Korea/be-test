import { User } from '../../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetUserByEmailRepository } from '../interfaces/i-get-user-by-email.repository';

@Injectable()
export class GetUserByEmailRepository implements IGetUserByEmailRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(email: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ email });
  }
}
