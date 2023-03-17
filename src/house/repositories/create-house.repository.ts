import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from '../../entities/house.entity';
import {
  CreateHouseRepositoryInputDto,
  ICreateHouseRepository,
} from '../interfaces/i-create-house.repository';

@Injectable()
export class CreateHouseRepository implements ICreateHouseRepository {
  constructor(
    @InjectRepository(House) private houseRepository: Repository<House>,
  ) {}

  async execute(params: CreateHouseRepositoryInputDto): Promise<House> {
    const house = this.houseRepository.create(params);
    return await this.houseRepository.save(house);
  }
}
