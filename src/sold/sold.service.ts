import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { House } from 'src/house/house.entity';
import { Repository } from 'typeorm';
import { Sold } from './sold.entity';

@Injectable()
export class SoldService {
    constructor(
        @InjectRepository(Sold) private readonly soldRepository: Repository<Sold>
    ) { }


    async create(house: House, date: Date) {
        const sold = this.soldRepository.create({ date });
        sold.house = house;
        return await this.soldRepository.save(sold);
    }
}
