import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MoistureRecordsService } from './moisture-records.service';
import { CreateMoistureRecordDto } from './dto/create-moisture-record.dto';
import { UpdateMoistureRecordDto } from './dto/update-moisture-record.dto';

@Controller('moisture-records')
export class MoistureRecordsController {
  constructor(private readonly moistureRecordsService: MoistureRecordsService) {}

  @Post()
  async create(@Body() createMoistureRecordDto: CreateMoistureRecordDto) {
    return this.moistureRecordsService.create(createMoistureRecordDto);
  }

  @Get()
  async findAll(
    @Query() query: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string,
  ) {
    return this.moistureRecordsService.findAll(query, +current, +pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.moistureRecordsService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateMoistureRecordDto: UpdateMoistureRecordDto) {
    return this.moistureRecordsService.update(id, updateMoistureRecordDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.moistureRecordsService.remove(+id);
  }
}
