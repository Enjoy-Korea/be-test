import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { House } from '../../entities';
import {
  CreateHouseRepositoryInputDto,
  ICreateHouseRepository,
} from '../interfaces';
import { getNamespace } from 'cls-hooked';

@Injectable()
export class CreateHouseRepository implements ICreateHouseRepository {
  constructor(
    @InjectRepository(House) private houseRepository: Repository<House>,
  ) {}

  async execute(params: CreateHouseRepositoryInputDto): Promise<House> {
    const queryRunner = getNamespace('transaction')?.get('queryRunner');
    if (!queryRunner) {
      throw new InternalServerErrorException('트랜잭션 에러');
    }

    const house = this.houseRepository.create(params);
    try {
      return await queryRunner.manager.save(house);
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw new InternalServerErrorException('트랜잭션 에러');
    }
  }
}
