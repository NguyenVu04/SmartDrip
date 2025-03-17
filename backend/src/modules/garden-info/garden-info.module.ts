import { Module } from '@nestjs/common';
import { GardenInfoService } from './garden-info.service';
import { GardenInfoController } from './garden-info.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GardenInfo, GardenInfoSchema } from './schemas/garden-info.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([
      {
        name: GardenInfo.name, schema: GardenInfoSchema
      }
    ])
  ],
  controllers: [GardenInfoController],
  providers: [GardenInfoService],
  exports: [GardenInfoService]
})
export class GardenInfoModule {}
