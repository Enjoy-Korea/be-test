import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from '../../entities';
import {
  GetHousesRepositoryInputDto,
  IGetHousesRepository,
} from '../interfaces';

@Injectable()
export class GetHousesRepository implements IGetHousesRepository {
  constructor(
    @InjectRepository(House) private houseRepository: Repository<House>,
  ) {}

  async execute(params: GetHousesRepositoryInputDto): Promise<House[]> {
    const { sortBy } = params;
    return await this.houseRepository.find({
      select: {
        id: true,
        name: true,
        university: true,
        houseType: true,
        pricePerDay: true,
        createdAt: true,
        images: { key: true, url: true },
      },
      relations: { images: true },
      order: { [sortBy]: params.order },
      skip: params.skip,
      take: params.limit,
    });
  }
}
