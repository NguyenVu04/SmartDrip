import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateHumidityRecordDto } from './dto/create-humidity-record.dto';
import { UpdateHumidityRecordDto } from './dto/update-humidity-record.dto';
import { InjectModel } from '@nestjs/mongoose';
import { HumidityRecord} from './schemas/humidity-record.schema';
import { Model } from 'mongoose';
import aqp from 'api-query-params';
import { UsersService } from '../users/users.service';

@Injectable()
export class HumidityRecordsService {

  constructor(
    @InjectModel(HumidityRecord.name)
    private humidityRecordModel: Model<HumidityRecord>,
    private readonly usersService: UsersService
  ) {

  }

  async create(createHumidityRecordDto: CreateHumidityRecordDto) {


    const { humidity, userId, timestamp} = createHumidityRecordDto
    const user = await this.usersService.findOneById(userId)
    if (!user) {
      throw new BadRequestException(`User with id ${userId} does not exist`)
    }
    const humidityRecord: any = await this.humidityRecordModel.create({
      humidity,
      userId,
      timestamp
    })
    
    console.log(userId)
    console.log(humidity)
    console.log(timestamp)
    return {
      _id: humidityRecord._id,
      userId: humidityRecord.userId
    }
  }

  async findAll(
    query: string,
    current: number,
    pageSize: number
  ) {
    const { filter, sort } = aqp(query)

    if (filter.current) delete filter.current
    if (filter.pageSize) delete filter.pageSize

    if (!current) current = 1
    if (!pageSize) pageSize = 10

    const totalItems = (await this.humidityRecordModel.find(filter)).length
    const totalPages = Math.ceil(totalItems / pageSize)
    const skip = (current - 1) * pageSize

    const results = await this.humidityRecordModel
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
    return await this.humidityRecordModel.findById(id)
  }

  async update(updateHumidityRecordDto: UpdateHumidityRecordDto) {
    const { _id, humidity, userId, timestamp} = updateHumidityRecordDto
    const humidityRecord: any = await this.humidityRecordModel
    .findByIdAndUpdate(_id, {
      humidity,
      userId,
      timestamp
    })
    return {
      _id: humidityRecord._id,
    }
  }


  async remove(_id: string): Promise<any> {
    return await this.humidityRecordModel
    .deleteOne({ _id })

  }
}
