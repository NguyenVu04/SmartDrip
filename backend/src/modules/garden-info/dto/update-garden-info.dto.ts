import { PartialType } from '@nestjs/mapped-types';
import { CreateGardenInfoDto } from './create-garden-info.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateGardenInfoDto extends PartialType(CreateGardenInfoDto) {
    @IsNotEmpty()
    _id: string;

    treeType: string;
    longitude: number;
    latitude: number;
    numOfTree: number;
}