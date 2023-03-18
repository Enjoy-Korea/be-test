import { Thumbnail } from '../../house/dtos/create-house.req.dto';

export interface CreateImagesRepositoryInputDto {
  houseId: string;
  images: Thumbnail[];
}

export interface ICreateImagesRepository {
  execute(params: CreateImagesRepositoryInputDto): Promise<void>;
}
