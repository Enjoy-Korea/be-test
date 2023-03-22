import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  GetHousesServiceInputDto,
  GetHousesServiceOutputDto,
  IGetHouseTotalCountRepository,
  IGetHousesRepository,
} from '../interfaces';
import { map, pipe, toArray } from '@fxts/core';
import {
  GetHouseTotalCountRepository,
  GetHousesRepository,
} from '../repositories';

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
    if (!totalCount) {
      return {
        houses: [],
        paginationInfo: {
          currentPage: 1,
          totalPage: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    }
    const totalPage = Math.ceil(totalCount / params.getLimit());
    if (params.getPage() > totalPage) {
      throw new BadRequestException('비정상적인 요청');
    }
    const houses = await this.getHousesRepository.execute({
      limit: params.getLimit(),
      order: params.getOrder(),
      skip: params.getSkip(),
      sort: params.getSort(),
    });

    return {
      houses: pipe(
        houses,
        map((house) => house.getInfoForList()),
        toArray,
      ),
      paginationInfo: {
        currentPage: params.getPage(),
        totalPage,
        hasNextPage: params.getPage() < totalPage,
        hasPreviousPage: params.getPage() > 1,
      },
    };
  }
}
