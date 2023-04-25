import { Injectable } from '@nestjs/common';
import { Houses } from 'src/repositories/entity/houses.entity';
import { RepositoriesService } from 'src/repositories/repositories.service';
import { CreateHouseDTO } from './interface/house.dto';
import { HouseImages } from 'src/repositories/entity/houseimages.entity';
import { HouseImagesDTO } from './interface/houseimage.dto';

@Injectable()
export class HouseService {
  constructor(private repositoriesService: RepositoriesService) {}

  async createHouse(newHouesInfo: CreateHouseDTO): Promise<Houses> {
    const house: Houses = await this.repositoriesService.createHouse(
      newHouesInfo,
    );
    if (newHouesInfo.images)
      await this.createHouseImage(house.id, newHouesInfo.images);

    return house;
  }

  async getHouseDetail(houseId: number): Promise<Houses> {
    return await this.repositoriesService.getHouseDetail(houseId);
  }

  async getHouseList(
    start: number,
    limit: number,
    sort: string,
    order: string,
  ): Promise<Houses[]> {
    return await this.repositoriesService.getHouseList(
      start,
      limit,
      sort,
      order,
    );
  }

  async createHouseImage(
    houseId: number,
    imageInfo: HouseImagesDTO[],
  ): Promise<HouseImages[]> {
    const houseinfo = await this.repositoriesService.getHouseDetail(houseId);
    const imageArr: HouseImages[] = imageInfo.map((image) => {
      return { ...image, houses: houseinfo };
    });
    return await this.repositoriesService.createHouseImage(imageArr);
  }
}
