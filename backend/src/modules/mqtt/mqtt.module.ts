import { Module } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { MqttController } from './mqtt.controller';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Mqtt, MqttSchema } from './schemas/mqtt.schema';

@Module({
  imports: [
      UsersModule,
      MongooseModule.forFeature([
        {
          name: Mqtt.name,
          schema: MqttSchema,
        },
      ]),
    ],
  controllers: [MqttController],
  providers: [MqttService],
  exports: [MqttService]
})
export class MqttModule {}
