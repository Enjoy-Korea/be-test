import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from '../../entities/image.entity';
import {
  CreateImagesRepositoryInputDto,
  ICreateImagesRepository,
} from '../interfaces/i-create-images.repository';
import { map, toArray } from '@fxts/core';
import { getNamespace } from 'cls-hooked';

@Injectable()
export class CreateImagesRepository implements ICreateImagesRepository {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
  ) {}

  async execute(params: CreateImagesRepositoryInputDto): Promise<void> {
    const queryRunner = getNamespace('transaction')?.get('queryRunner');
    if (!queryRunner) {
      throw new InternalServerErrorException('트랜잭션 에러');
    }
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
    try {
      await queryRunner.manager.save(imageEntities);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('트랜잭션 에러');
    } finally {
      await queryRunner.release();
    }
    return;
  }
}
