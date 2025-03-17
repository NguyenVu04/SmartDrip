import { Injectable } from '@nestjs/common';
import { CreateMqttDto } from './dto/create-mqtt.dto';
import { UpdateMqttDto } from './dto/update-mqtt.dto';

@Injectable()
export class MqttService {
  create(createMqttDto: CreateMqttDto) {
    return 'This action adds a new mqtt';
  }

  findAll() {
    return `This action returns all mqtt`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mqtt`;
  }

  update(id: number, updateMqttDto: UpdateMqttDto) {
    return `This action updates a #${id} mqtt`;
  }

  remove(id: number) {
    return `This action removes a #${id} mqtt`;
  }
}
