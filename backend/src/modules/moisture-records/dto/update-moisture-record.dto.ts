import { PartialType } from '@nestjs/mapped-types';
import { CreateMoistureRecordDto } from './create-moisture-record.dto';

export class UpdateMoistureRecordDto extends PartialType(CreateMoistureRecordDto) {}
