import { Module } from '@nestjs/common';
import { HumidityRecordsService } from './humidity-records.service';
import { HumidityRecordsController } from './humidity-records.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HumidityRecord, HumidityRecordSchema } from './schemas/humidity-record.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: HumidityRecord.name, schema: HumidityRecordSchema
      }
    ])
    , UsersModule
  ],
  controllers: [HumidityRecordsController],
  providers: [HumidityRecordsService],
})
export class HumidityRecordsModule {}
