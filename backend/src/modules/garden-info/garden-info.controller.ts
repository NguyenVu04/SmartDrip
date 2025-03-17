import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GardenInfoService } from './garden-info.service';
import { CreateGardenInfoDto } from './dto/create-garden-info.dto';
import { UpdateGardenInfoDto } from './dto/update-garden-info.dto';

@Controller('garden-info')
export class GardenInfoController {
  constructor(private readonly gardenInfoService: GardenInfoService) {}

  @Post()
  async create(@Body() createGardenInfoDto: CreateGardenInfoDto) {
    return this.gardenInfoService.create(createGardenInfoDto);
  }

  @Get()
  async findAll(
    @Query() query: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string,
  ) {
    return this.gardenInfoService.findAll(query, +current, +pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.gardenInfoService.findOne(id);
  }

  @Patch(':id') // done
  async update(@Param('id') id: string, @Body() updateGardenInfoDto: UpdateGardenInfoDto) {
    return this.gardenInfoService.update(+id, updateGardenInfoDto);
  }

  // @Delete(':id') // done
  // async remove(@Param('id') id: string) {
  //   return this.gardenInfoService.remove(id);
  // }
}
