import { Module } from '@nestjs/common';
import { MoistureRecordsService } from './moisture-records.service';
import { MoistureRecordsController } from './moisture-records.controller';

@Module({
  controllers: [MoistureRecordsController],
  providers: [MoistureRecordsService],
})
export class MoistureRecordsModule {}
