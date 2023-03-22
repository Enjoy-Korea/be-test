import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";
import { CreateImageDto } from "src/image/dtos/create-image.dto";

export class CreateHouseDto {
    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    address: string;

    @IsString()
    university: string

    @IsString()
    houseType: string

    @IsNumber()
    pricePerDay: number

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateImageDto)
    images: CreateImageDto[];
}