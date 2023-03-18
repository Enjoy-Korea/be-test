import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  GetHousesServiceInputDto,
  GetHousesServiceOutputDto,
} from '../interfaces/i-get-houses.service';
import { map, toArray } from '@fxts/core';
import { IGetHouseTotalCountRepository } from '../interfaces/i-get-house-total-count.repository';
import { GetHouseTotalCountRepository } from '../repositories/get-house-total-count.repository';
import { IGetHousesRepository } from '../interfaces/i-get-houses.repository';
import { GetHousesRepository } from '../repositories/get-houses.repository';

@Injectable()
export class GetHousesService {
  constructor(
    @Inject(GetHouseTotalCountRepository)
    private getHouseTotalCountRepository: IGetHouseTotalCountRepository,
    @Inject(GetHousesRepository)
    private getHousesRepository: IGetHousesRepository,
  ) {}

  async execute(
    params: GetHousesServiceInputDto,
  ): Promise<GetHousesServiceOutputDto> {
    const totalCount = await this.getHouseTotalCountRepository.execute();
    const lastPage = Math.floor(totalCount / params.getLimit());
    if (params.getPage() > lastPage) {
      throw new BadRequestException('비정상적인 요청');
    }
    const houses = await this.getHousesRepository.execute({
      limit: params.getLimit(),
      order: params.getOrder(),
      skip: params.getSkip(),
      sortBy: params.getSortBy(),
    });

    return {
      houses: toArray(map((house) => house.getInfoForList(), houses)),
      paginationInfo: {
        currentPage: params.getPage(),
        hasNextPage: params.getPage() < lastPage,
        hasPreviousPage: params.getPage() > 1,
      },
    };
  }
}
