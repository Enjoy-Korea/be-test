import { User } from '../../entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ICheckEmailDuplicateRepository } from '../interfaces';

@Injectable()
export class CheckEmailDuplicateRepository
  implements ICheckEmailDuplicateRepository
{
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async execute(email: string): Promise<boolean> {
    return await this.userRepository.exist({ where: { email: email } });
  }
}
