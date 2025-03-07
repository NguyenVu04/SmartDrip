import { Injectable } from '@nestjs/common';
import { CreateHumidityRecordDto } from './dto/create-humidity-record.dto';
import { UpdateHumidityRecordDto } from './dto/update-humidity-record.dto';

@Injectable()
export class HumidityRecordsService {
  create(createHumidityRecordDto: CreateHumidityRecordDto) {
    return 'This action adds a new humidityRecord';
  }

  findAll() {
    return `This action returns all humidityRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} humidityRecord`;
  }

  update(id: number, updateHumidityRecordDto: UpdateHumidityRecordDto) {
    return `This action updates a #${id} humidityRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} humidityRecord`;
  }
}
