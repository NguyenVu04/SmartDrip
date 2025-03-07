import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MoistureRecordsService } from './moisture-records.service';
import { CreateMoistureRecordDto } from './dto/create-moisture-record.dto';
import { UpdateMoistureRecordDto } from './dto/update-moisture-record.dto';

@Controller('moisture-records')
export class MoistureRecordsController {
  constructor(private readonly moistureRecordsService: MoistureRecordsService) {}

  @Post()
  create(@Body() createMoistureRecordDto: CreateMoistureRecordDto) {
    return this.moistureRecordsService.create(createMoistureRecordDto);
  }

  @Get()
  findAll() {
    return this.moistureRecordsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moistureRecordsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMoistureRecordDto: UpdateMoistureRecordDto) {
    return this.moistureRecordsService.update(+id, updateMoistureRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moistureRecordsService.remove(+id);
  }
}
