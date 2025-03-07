import { Injectable } from '@nestjs/common';
import { CreatePumpRecordDto } from './dto/create-pump-record.dto';
import { UpdatePumpRecordDto } from './dto/update-pump-record.dto';

@Injectable()
export class PumpRecordsService {
  create(createPumpRecordDto: CreatePumpRecordDto) {
    return 'This action adds a new pumpRecord';
  }

  findAll() {
    return `This action returns all pumpRecords`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pumpRecord`;
  }

  update(id: number, updatePumpRecordDto: UpdatePumpRecordDto) {
    return `This action updates a #${id} pumpRecord`;
  }

  remove(id: number) {
    return `This action removes a #${id} pumpRecord`;
  }
}
