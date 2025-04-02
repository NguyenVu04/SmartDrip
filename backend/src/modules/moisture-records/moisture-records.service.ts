import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMoistureRecordDto } from './dto/create-moisture-record.dto';
import { UpdateMoistureRecordDto } from './dto/update-moisture-record.dto';
import aqp from 'api-query-params';
import { InjectModel } from '@nestjs/mongoose';
import { MoistureRecord } from './schemas/moisture-record.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class MoistureRecordsService {
  constructor(
    @InjectModel(MoistureRecord.name)
    private moistureRecordModel: Model<MoistureRecord>,
    private usersService: UsersService
  ){}
  async create(createMoistureRecordDto: CreateMoistureRecordDto) {
    const { moisture, userId, timestamp } = createMoistureRecordDto

    const user = await this.usersService.findOneById(userId)
    if (!user) {
      throw new BadRequestException(`User with id ${userId} does not exist`)
    }
    const moistureRecord: any = await this.moistureRecordModel.create({
      moisture,
      userId,
      timestamp
    })
    return {
      _id: moistureRecord._id,
      userId: moistureRecord.userId
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query)

    if (filter.current) delete filter.current
    if (filter.pageSize) delete filter.pageSize

    if (!current) current = 1
    if (!pageSize) pageSize = 10

    const totalItems = (await this.moistureRecordModel.find(filter)).length
    const totalPages = Math.ceil(totalItems / pageSize)
    const skip = (current - 1) * pageSize

    const results = await this.moistureRecordModel
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
    return await this.moistureRecordModel.findById(id) 
  }

  async update(id: string, updateMoistureRecordDto: UpdateMoistureRecordDto) {
    const { userId, moisture, timestamp } = updateMoistureRecordDto
    const moistureRecord = await this.moistureRecordModel
    .findByIdAndUpdate(id, {
      userId,
      moisture,
      timestamp
    }, { new: true
    })

    if (!moistureRecord) {
      throw new BadRequestException(`Moisture record with id ${id} does not exist`)
    }
    return {
      _id: moistureRecord._id,
      userId: moistureRecord.userId
    }
  }

  async remove(id: number): Promise<any> {
    return await this.moistureRecordModel.deleteOne({ _id: id })
  }
}
