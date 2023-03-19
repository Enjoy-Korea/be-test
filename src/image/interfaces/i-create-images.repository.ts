import { Thumbnail } from '../../house/dtos/request/create-house.req.dto';

export interface CreateImagesRepositoryInputDto {
  houseId: string;
  images: Thumbnail[];
}

export interface ICreateImagesRepository {
  execute(params: CreateImagesRepositoryInputDto): Promise<void>;
}
