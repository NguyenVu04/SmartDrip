import { PartialType } from '@nestjs/mapped-types';
import { CreateHumidityRecordDto } from './create-humidity-record.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateHumidityRecordDto {
    @IsNotEmpty()
    _id: string;

    
    humidity: number;
    userId: string;
    timestamp: Date;
}