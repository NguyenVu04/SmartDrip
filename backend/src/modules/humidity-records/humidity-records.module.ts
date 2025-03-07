import { Module } from '@nestjs/common';
import { HumidityRecordsService } from './humidity-records.service';
import { HumidityRecordsController } from './humidity-records.controller';

@Module({
  controllers: [HumidityRecordsController],
  providers: [HumidityRecordsService],
})
export class HumidityRecordsModule {}
