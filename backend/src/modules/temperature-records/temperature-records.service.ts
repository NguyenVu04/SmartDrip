import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTemperatureRecordDto } from './dto/create-temperature-record.dto';
import { UpdateTemperatureRecordDto } from './dto/update-temperature-record.dto';
import { InjectModel } from '@nestjs/mongoose';
import { TemperatureRecord } from './schemas/temperature-record.entity';
import { UsersService } from '../users/users.service';
import { Model } from 'mongoose';
import aqp from 'api-query-params';

@Injectable()
export class TemperatureRecordsService {
  constructor(
    @InjectModel(TemperatureRecord.name)
    private temperatureRecordModel: Model<TemperatureRecord>,
    private usersService: UsersService
  ){}
  async create(createTemperatureRecordDto: CreateTemperatureRecordDto) {
    const { temperature, userId, timestamp } = createTemperatureRecordDto
    
    const user = await this.usersService.findOneById(userId)
    if (!user) {
      throw new BadRequestException(`User with id ${userId} does not exist`)
    }
    const pumpRecord: any = await this.temperatureRecordModel.create({
      temperature,
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

    const totalItems = (await this.temperatureRecordModel.find(filter)).length
    const totalPages = Math.ceil(totalItems / pageSize)
    const skip = (current - 1) * pageSize

    const results = await this.temperatureRecordModel
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
    return await this.temperatureRecordModel.findById(id)
  }

  async update(id: number, updateTemperatureRecordDto: UpdateTemperatureRecordDto) {
    const { userId, temperature, timestamp } = updateTemperatureRecordDto
        const temperatureRecord = await this.temperatureRecordModel
        .findByIdAndUpdate(id, {
          userId,
          temperature,
          timestamp
        }, { new: true
        })
    
        if (!temperatureRecord) {
          throw new BadRequestException(`Temperature record with id ${id} does not exist`)
        }
        return {
          _id: temperatureRecord._id,
          userId: temperatureRecord.userId
        }
  }

  async remove(id: string) {
    const temperatureRecord = await this.temperatureRecordModel.findByIdAndDelete(id)
    if (!temperatureRecord) {
      throw new BadRequestException(`Temperature record with id ${id} does not exist`)
    }
    return {
      _id: temperatureRecord._id,
      userId: temperatureRecord.userId
    }
  }
}
