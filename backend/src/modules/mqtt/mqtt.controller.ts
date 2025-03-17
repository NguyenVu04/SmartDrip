import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MqttService } from './mqtt.service';
import { CreateMqttDto } from './dto/create-mqtt.dto';
import { UpdateMqttDto } from './dto/update-mqtt.dto';

@Controller('mqtt')
export class MqttController {
  constructor(private readonly mqttService: MqttService) {}

  @Post()
  async create(@Body() createMqttDto: CreateMqttDto) {
    return await this.mqttService.create(createMqttDto);
  }

  @Get()
  async findAll(
    @Query() query: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string,
  ) {
    return await this.mqttService.findAll(query, +current, +pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.mqttService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') _id: string,
    @Body() updateMqttDto: UpdateMqttDto) {
    return await this.mqttService.updateById(_id, updateMqttDto);
  }

  @Patch('user/:userId')
  async updateByUserId(@Param('userId') userId: string, @Body() updateMqttDto: UpdateMqttDto) {
    return await this.mqttService.updateByUserId(userId, updateMqttDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.mqttService.removeByUserId(id);
  }
}
