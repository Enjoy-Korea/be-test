import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../../entities/image.entity';
import {
  CreateImagesRepositoryInputDto,
  ICreateImagesRepository,
} from '../interfaces/i-create-images.repository';
import { map, toArray } from '@fxts/core';

@Injectable()
export class CreateImagesRepository implements ICreateImagesRepository {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  async execute(params: CreateImagesRepositoryInputDto): Promise<void> {
    const { houseId, images } = params;
    const imageEntities = toArray(
      map(
        (image) =>
          this.imageRepository.create({
            houseId,
            url: image.url,
            key: image.key,
          }),
        images,
      ),
    );
    await this.imageRepository.save(imageEntities);
    return;
  }
}
