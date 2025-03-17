import { Module } from '@nestjs/common';
import { PumpRecordsService } from './pump-records.service';
import { PumpRecordsController } from './pump-records.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PumpRecord, PumpRecordSchema } from './schemas/pump-record.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: PumpRecord.name, schema: PumpRecordSchema
      }
    ])
  ],
  controllers: [PumpRecordsController],
  providers: [PumpRecordsService],
  exports: [PumpRecordsService]

})
export class PumpRecordsModule {}
