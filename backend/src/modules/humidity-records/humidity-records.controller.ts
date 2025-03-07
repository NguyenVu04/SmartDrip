import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HumidityRecordsService } from './humidity-records.service';
import { CreateHumidityRecordDto } from './dto/create-humidity-record.dto';
import { UpdateHumidityRecordDto } from './dto/update-humidity-record.dto';

@Controller('humidity-records')
export class HumidityRecordsController {
  constructor(private readonly humidityRecordsService: HumidityRecordsService) {}

  @Post()
  create(@Body() createHumidityRecordDto: CreateHumidityRecordDto) {
    return this.humidityRecordsService.create(createHumidityRecordDto);
  }

  @Get()
  findAll() {
    return this.humidityRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.humidityRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHumidityRecordDto: UpdateHumidityRecordDto) {
    return this.humidityRecordsService.update(+id, updateHumidityRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.humidityRecordsService.remove(+id);
  }
}
