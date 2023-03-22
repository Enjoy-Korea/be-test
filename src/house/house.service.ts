import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHouseDto } from './dtos/create-house.dto';
import { House } from './house.entity';
import { ImageService } from 'src/image/image.service';

@Injectable()
export class HouseService {
    constructor(
        @InjectRepository(House) private houseRepository: Repository<House>,
        @Inject(ImageService) private imageService: ImageService
    ) { }

    async create(createHouseDto: CreateHouseDto) {
        const house = this.houseRepository.create(createHouseDto);

        const images = createHouseDto.images;
        const createdImages = await Promise.all(images.map(image => this.imageService.create(image.url, image.key)));
        house.images = createdImages

        return this.houseRepository.save(house);
    }

    async findAll(page: number, limit: number, sort: 'ASC' | 'DESC') {
        const skip = (page - 1) * limit;

        return await this.houseRepository.find({
            order: {
                pricePerDay: sort
            },
            skip: skip,
            take: limit,
            select: ['name', 'university', 'images', 'houseType', 'pricePerDay']
        });
    }

    async findOne(houseId: number) {
        return await this.houseRepository.find({
            where: {
                id: houseId
            }
        })
    }

}
