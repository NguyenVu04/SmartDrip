import { Injectable } from '@nestjs/common';
import { CreateMoistureRecordDto } from './dto/create-moisture-record.dto';
import { UpdateMoistureRecordDto } from './dto/update-moisture-record.dto';

@Injectable()
export class MoistureRecordsService {
  create(createMoistureRecordDto: CreateMoistureRecordDto) {
    return 'This action adds a new moistureRecord';
  }

  findAll() {
    return `This action returns all moistureRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} moistureRecord`;
  }

  update(id: number, updateMoistureRecordDto: UpdateMoistureRecordDto) {
    return `This action updates a #${id} moistureRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} moistureRecord`;
  }
}
