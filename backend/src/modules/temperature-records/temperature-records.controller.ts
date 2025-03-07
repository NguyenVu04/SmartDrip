import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TemperatureRecordsService } from './temperature-records.service';
import { CreateTemperatureRecordDto } from './dto/create-temperature-record.dto';
import { UpdateTemperatureRecordDto } from './dto/update-temperature-record.dto';

@Controller('temperature-records')
export class TemperatureRecordsController {
  constructor(private readonly temperatureRecordsService: TemperatureRecordsService) {}

  @Post()
  create(@Body() createTemperatureRecordDto: CreateTemperatureRecordDto) {
    return this.temperatureRecordsService.create(createTemperatureRecordDto);
  }

  @Get()
  findAll() {
    return this.temperatureRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.temperatureRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemperatureRecordDto: UpdateTemperatureRecordDto) {
    return this.temperatureRecordsService.update(+id, updateTemperatureRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.temperatureRecordsService.remove(+id);
  }
}
