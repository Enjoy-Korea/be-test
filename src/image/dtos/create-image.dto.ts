import { IsNumber, IsUrl } from "class-validator";

export class CreateImageDto {
    @IsUrl()
    url: string;
    
    @IsNumber()
    key: number;
}