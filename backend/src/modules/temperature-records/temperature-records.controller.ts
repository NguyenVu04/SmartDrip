import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TemperatureRecordsService } from './temperature-records.service';
import { CreateTemperatureRecordDto } from './dto/create-temperature-record.dto';
import { UpdateTemperatureRecordDto } from './dto/update-temperature-record.dto';

@Controller('temperature-records')
export class TemperatureRecordsController {
  constructor(private readonly temperatureRecordsService: TemperatureRecordsService) {}

  @Post()
  async create(@Body() createTemperatureRecordDto: CreateTemperatureRecordDto) {
    return this.temperatureRecordsService.create(createTemperatureRecordDto);
  }

  @Get()
  async findAll(@Query() query: string,
        @Query("current") current: string,
        @Query("pageSize") pageSize: string,) {
    return this.temperatureRecordsService.findAll(query, +current, +pageSize);
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.temperatureRecordsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTemperatureRecordDto: UpdateTemperatureRecordDto) {
    return this.temperatureRecordsService.update(+id, updateTemperatureRecordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.temperatureRecordsService.remove(id);
  }
}
