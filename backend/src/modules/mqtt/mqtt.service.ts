import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMqttDto } from './dto/create-mqtt.dto';
import { UpdateMqttDto } from './dto/update-mqtt.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Mqtt } from './schemas/mqtt.schema';
import mongoose, { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import aqp from 'api-query-params';

@Injectable()
export class MqttService {

  constructor(
    @InjectModel(Mqtt.name)
    private mqttModel: Model<Mqtt>,

    private readonly usersService: UsersService
  ){}
  async IsExistThisUserId(userId: string) {
    const isExist = await this.mqttModel.exists({userId});
    return isExist;
  }

  async IsExistThisUser(userId: string) {
    const user = await this.usersService.findOneById(userId);
    return user;
  }
  async create(createMqttDto: CreateMqttDto) {
    const {userId, aioKey, aioUsername, pumpFeed, temperatureFeed, moistureFeed, humidityFeed} = createMqttDto;
    const isExistUser = await this.IsExistThisUser(userId);

    if (!isExistUser) {
      throw new BadRequestException('User not found');
    }

    const isExist = await this.IsExistThisUserId(userId);
    if(isExist) {     
      throw new BadRequestException('This user already has a mqtt');
    }

    const mqtt = await this.mqttModel.create({
      userId, aioKey, aioUsername, pumpFeed, temperatureFeed, moistureFeed, humidityFeed
    })

    return {
      _id: mqtt._id,
      userId: mqtt.userId
    }

  }

  async findAll(query: string, current: number, pageSize: number) {
    const {filter, sort} = aqp(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.mqttModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;

    const gardenInfos = await this.mqttModel
    .find(filter)
    .limit(pageSize)
    .skip(skip)
    .sort(sort as any);

    return {
      gardenInfos,
      totalItems,
      totalPages,
      current,
      pageSize
    }
  }

  async findOne(userId: string) {
    return await this.mqttModel.findById(userId);
  }

  async checkIfExist(_id: string) {
    return await this.mqttModel.exists({_id});
  }

  async updateById(_id: string, updateMqttDto: UpdateMqttDto) {
    // check if this _id is exist
    const isExist = await this.checkIfExist(_id);
    if (!isExist) {
      throw new BadRequestException('Mqtt not found');
    }

    console.log(updateMqttDto);
    return await this.mqttModel.updateOne({
      _id: _id
    }, updateMqttDto
    )
  }

  async updateByUserId(userId: string, updateMqttDto: UpdateMqttDto) {
    // check if this userId is exist
    const isExist = await this.IsExistThisUserId(userId);
    if (!isExist) {
      throw new BadRequestException('Mqtt not found');
    }
    
    return await this.mqttModel.updateOne({
      userId: userId
    }, updateMqttDto
    )
  }
  async removeByUserId(userId: string) {
    if (mongoose.isValidObjectId(userId)) {
      return this.mqttModel.deleteOne({ userId: userId });
    } else{
      throw new BadRequestException('Invalid id');
    }
  }
}
