import { PartialType } from '@nestjs/mapped-types';
import { CreatePumpRecordDto } from './create-pump-record.dto';

export class UpdatePumpRecordDto{
    pump: number
    timestamp: Date
    userId: string
}
