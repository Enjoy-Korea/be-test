import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './image.entity';

@Injectable()
export class ImageService {
    constructor(@InjectRepository(Image) private readonly imageRepository: Repository<Image>) { }

    async create(url: string, key: number): Promise<Image> {
        return this.imageRepository.create({ url, key });
    }
}