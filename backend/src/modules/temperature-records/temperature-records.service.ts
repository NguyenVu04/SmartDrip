import { Injectable } from '@nestjs/common';
import { CreateTemperatureRecordDto } from './dto/create-temperature-record.dto';
import { UpdateTemperatureRecordDto } from './dto/update-temperature-record.dto';

@Injectable()
export class TemperatureRecordsService {
  create(createTemperatureRecordDto: CreateTemperatureRecordDto) {
    return 'This action adds a new temperatureRecord';
  }

  findAll() {
    return `This action returns all temperatureRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} temperatureRecord`;
  }

  update(id: number, updateTemperatureRecordDto: UpdateTemperatureRecordDto) {
    return `This action updates a #${id} temperatureRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} temperatureRecord`;
  }
}
