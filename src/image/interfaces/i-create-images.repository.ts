import { Image } from '../../house/dtos/create-house.req.dto';

export interface CreateImagesRepositoryInputDto {
  houseId: string;
  images: Image[];
}

export interface ICreateImagesRepository {
  execute(params: CreateImagesRepositoryInputDto): Promise<void>;
}
