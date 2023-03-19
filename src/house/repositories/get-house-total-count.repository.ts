import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IGetHouseTotalCountRepository } from '../interfaces';
import { House } from '../../entities';

@Injectable()
export class GetHouseTotalCountRepository
  implements IGetHouseTotalCountRepository
{
  constructor(
    @InjectRepository(House) private houseRepository: Repository<House>,
  ) {}

  async execute(): Promise<number> {
    return await this.houseRepository.count();
  }
}
