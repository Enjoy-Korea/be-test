import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from '../../entities';
import { IGetHouseByIdRepository } from '../interfaces';

@Injectable()
export class GetHouseByIdRepository implements IGetHouseByIdRepository {
  constructor(
    @InjectRepository(House) private houseRepository: Repository<House>,
  ) {}

  async execute(houseId: string): Promise<House | null> {
    return await this.houseRepository.findOne({
      where: { id: houseId },
      relations: { images: true },
    });
  }
}
