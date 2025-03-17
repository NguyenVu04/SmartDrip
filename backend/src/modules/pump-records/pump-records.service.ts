import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePumpRecordDto } from './dto/create-pump-record.dto';
import { UpdatePumpRecordDto } from './dto/update-pump-record.dto';
import { InjectModel } from '@nestjs/mongoose';
import { PumpRecord } from './schemas/pump-record.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import aqp from 'api-query-params';

@Injectable()
export class PumpRecordsService {
  constructor(
      @InjectModel(PumpRecord.name)
      private pumpRecordsModel: Model<PumpRecord>,
      private usersService: UsersService
    ){}
  async create(createPumpRecordDto: CreatePumpRecordDto) {
    const { pump, userId, timestamp } = createPumpRecordDto
    
    const user = await this.usersService.findOneById(userId)
    if (!user) {
      throw new BadRequestException(`User with id ${userId} does not exist`)
    }
    const pumpRecord: any = await this.pumpRecordsModel.create({
      pump,
      userId,
      timestamp
    })
    return {
      _id: pumpRecord._id,
      userId: pumpRecord.userId
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query)

    if (filter.current) delete filter.current
    if (filter.pageSize) delete filter.pageSize

    if (!current) current = 1
    if (!pageSize) pageSize = 10

    const totalItems = (await this.pumpRecordsModel.find(filter)).length
    const totalPages = Math.ceil(totalItems / pageSize)
    const skip = (current - 1) * pageSize

    const results = await this.pumpRecordsModel
    .find(filter)
    .limit(pageSize)
    .skip(skip)
    .sort(sort as any)

    return {
      results,
      totalItems,
      totalPages,
      current,
      pageSize
    }
  }

  async findOne(id: string) {
    return await this.pumpRecordsModel.findById(id) 
  }

  async update(id: string, updatePumpRecordDto: UpdatePumpRecordDto) {
    const { userId, pump, timestamp } = updatePumpRecordDto
    const pumpRecord = await this.pumpRecordsModel
    .findByIdAndUpdate(id, {
      userId,
      pump,
      timestamp
    }, { new: true
    })

    if (!pumpRecord) {
      throw new BadRequestException(`Moisture record with id ${id} does not exist`)
    }
    return {
      _id: pumpRecord._id,
      userId: pumpRecord.userId
    }
  }

  async remove(id: string) {
    return `This action removes a #${id} pumpRecord`;
  }
}
