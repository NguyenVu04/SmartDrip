import { Module } from '@nestjs/common';
import { MoistureRecordsService } from './moisture-records.service';
import { MoistureRecordsController } from './moisture-records.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { MoistureRecord, MoistureRecordSchema } from './schemas/moisture-record.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name: MoistureRecord.name, schema: MoistureRecordSchema
      }
    ]),
    UsersModule
  ],
  controllers: [MoistureRecordsController],
  providers: [MoistureRecordsService],
  exports: [MoistureRecordsService]
})
export class MoistureRecordsModule {}
