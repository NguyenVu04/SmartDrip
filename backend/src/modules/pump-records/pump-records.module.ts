import { Module } from '@nestjs/common';
import { PumpRecordsService } from './pump-records.service';
import { PumpRecordsController } from './pump-records.controller';

@Module({
  controllers: [PumpRecordsController],
  providers: [PumpRecordsService],
})
export class PumpRecordsModule {}
