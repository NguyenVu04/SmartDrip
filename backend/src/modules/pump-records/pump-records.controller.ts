import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PumpRecordsService } from './pump-records.service';
import { CreatePumpRecordDto } from './dto/create-pump-record.dto';
import { UpdatePumpRecordDto } from './dto/update-pump-record.dto';

@Controller('pump-records')
export class PumpRecordsController {
  constructor(private readonly pumpRecordsService: PumpRecordsService) {}

  @Post()
  create(@Body() createPumpRecordDto: CreatePumpRecordDto) {
    return this.pumpRecordsService.create(createPumpRecordDto);
  }

  @Get()
  findAll() {
    return this.pumpRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pumpRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePumpRecordDto: UpdatePumpRecordDto) {
    return this.pumpRecordsService.update(+id, updatePumpRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pumpRecordsService.remove(+id);
  }
}
