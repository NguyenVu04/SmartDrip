import { Module } from '@nestjs/common';
import { TemperatureRecordsService } from './temperature-records.service';
import { TemperatureRecordsController } from './temperature-records.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TemperatureRecord, TemperatureRecordSchema } from './schemas/temperature-record.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: TemperatureRecord.name,
        schema: TemperatureRecordSchema,
      },
    ]),
  ],
  controllers: [TemperatureRecordsController],
  providers: [TemperatureRecordsService],
  exports: [TemperatureRecordsService],
})
export class TemperatureRecordsModule {}
