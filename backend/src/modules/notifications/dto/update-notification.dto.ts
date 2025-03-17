import { PartialType } from '@nestjs/mapped-types';
import { CreateNotificationDto } from './create-notification.dto';
import { IsNotEmpty, IsOptional } from 'class-validator';
import dayjs from 'dayjs';

export class UpdateNotificationDto {
    @IsNotEmpty()
    _id: string;

    @IsOptional()
    content: string;
    
    @IsOptional()
    seen: boolean;

    @IsOptional()
    timestamp: Date = dayjs().toDate();
}
