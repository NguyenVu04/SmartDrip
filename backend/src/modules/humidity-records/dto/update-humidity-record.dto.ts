import { PartialType } from '@nestjs/mapped-types';
import { CreateHumidityRecordDto } from './create-humidity-record.dto';

export class UpdateHumidityRecordDto extends PartialType(CreateHumidityRecordDto) {}
