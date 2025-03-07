import { PartialType } from '@nestjs/mapped-types';
import { CreateTemperatureRecordDto } from './create-temperature-record.dto';

export class UpdateTemperatureRecordDto extends PartialType(CreateTemperatureRecordDto) {}
