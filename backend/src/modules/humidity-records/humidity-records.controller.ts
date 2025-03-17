import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { HumidityRecordsService } from './humidity-records.service';
import { CreateHumidityRecordDto } from './dto/create-humidity-record.dto';
import { UpdateHumidityRecordDto } from './dto/update-humidity-record.dto';

@Controller('humidity-records')
export class HumidityRecordsController {
  constructor(private readonly humidityRecordsService: HumidityRecordsService) {}

  @Post()
  async create(@Body() createHumidityRecordDto: CreateHumidityRecordDto) {
    return this.humidityRecordsService.create(createHumidityRecordDto);
  }

  @Get()
  async findAll(
      @Query() query: string,
      @Query("current") current: string,
      @Query("pageSize") pageSize: string,
    ) {
    return this.humidityRecordsService.findAll(query, +current, +pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.humidityRecordsService.findOne(id);
  }

  @Patch(':id')
  async update(@Body() updateHumidityRecordDto: UpdateHumidityRecordDto) {
    return this.humidityRecordsService.update(updateHumidityRecordDto);
  }

  @Delete(':id')
  async remove(@Param('id') _id: string) {
    return this.humidityRecordsService.remove(_id);
  }
}
