import { Module } from '@nestjs/common';
import { TemperatureRecordsService } from './temperature-records.service';
import { TemperatureRecordsController } from './temperature-records.controller';

@Module({
  controllers: [TemperatureRecordsController],
  providers: [TemperatureRecordsService],
})
export class TemperatureRecordsModule {}
