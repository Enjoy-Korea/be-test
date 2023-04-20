import { Injectable } from '@nestjs/common';
import { FindAllHouseDto } from './dto/findall-house.dto';
import { House } from 'src/entities/house.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class HousesService {
  constructor(
    @InjectRepository(House) private houseRepository: Repository<House>,
  ) {}

  async findHouseList(findAllHouseDto: FindAllHouseDto): Promise<object[]> {
    return await this.houseRepository.find({
      order: { pricePerDay: findAllHouseDto.sort },
      skip: 4 * (Number(findAllHouseDto.page) - 1),
      take: 4,
      select: [
        'id',
        'name',
        'university',
        'images',
        'houseType',
        'pricePerDay',
      ],
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} house`;
  }
}
