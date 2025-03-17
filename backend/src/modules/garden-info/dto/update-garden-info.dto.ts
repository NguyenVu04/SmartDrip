import { PartialType } from '@nestjs/mapped-types';
import { CreateGardenInfoDto } from './create-garden-info.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateGardenInfoDto {
    @IsNotEmpty()
    _id: string;

    @IsOptional()
    longitude: number;
    @IsOptional()
    treeType: string;
    @IsOptional()
    latitude: number;
    @IsOptional()
    numOfTree: number;
    @IsOptional()
    cropStart: Date;
}