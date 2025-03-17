import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { CreateMqttDto } from './dto/create-mqtt.dto';
import { UpdateMqttDto } from './dto/update-mqtt.dto';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Post()
  create(@Body() createMqttDto: CreateMqttDto) {
    return this.mqttService.create(createMqttDto);
  }

  @Get()
  findAll() {
    return this.mqttService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mqttService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMqttDto: UpdateMqttDto) {
    return this.mqttService.update(+id, updateMqttDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mqttService.remove(+id);
  }
}
