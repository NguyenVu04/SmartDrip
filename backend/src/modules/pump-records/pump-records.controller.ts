import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PumpRecordsService } from './pump-records.service';
import { CreatePumpRecordDto } from './dto/create-pump-record.dto';
import { UpdatePumpRecordDto } from './dto/update-pump-record.dto';

@Controller('pump-records')
export class PumpRecordsController {
  constructor(private readonly pumpRecordsService: PumpRecordsService) {}

  @Post()
  async create(@Body() createPumpRecordDto: CreatePumpRecordDto) {
    return this.pumpRecordsService.create(createPumpRecordDto);
  }

  @Get()
  async findAll(
      @Query() query: string,
      @Query("current") current: string,
      @Query("pageSize") pageSize: string,) {
    return this.pumpRecordsService.findAll(query, +current, +pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.pumpRecordsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePumpRecordDto: UpdatePumpRecordDto) {
    return this.pumpRecordsService.update(id, updatePumpRecordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pumpRecordsService.remove(id);
  }
}
