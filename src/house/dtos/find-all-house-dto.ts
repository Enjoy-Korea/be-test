import { IsOptional, IsString, Matches } from 'class-validator';

export class FindAllHousesDto {
  @IsOptional()
  @IsString()
  page?: string = '1';

  @IsOptional()
  @IsString()
  limit?: string = '5';

  @IsOptional()
  @IsString()
  @Matches(/^(ASC|DESC)$/i, {
    message: 'sort must be either "ASC" or "DESC"',
  })
  sort?: 'ASC' | 'DESC' = 'ASC';
}