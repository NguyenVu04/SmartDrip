import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateGardenInfoDto } from './dto/create-garden-info.dto';
import { UpdateGardenInfoDto } from './dto/update-garden-info.dto';
import { InjectModel } from '@nestjs/mongoose';
import { GardenInfo } from './schemas/garden-info.schema';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';

@Injectable()
export class GardenInfoService {
  constructor(
    @InjectModel(GardenInfo.name)
    private gardenInfoModel: Model<GardenInfo>,
    private readonly usersService: UsersService
  ){}

  async IsExistThisUserId(userId: string) {
    const isExist = await this.gardenInfoModel.exists({userId});
    return isExist;
  }

  async IsExistThisUser(userId: string) {
    const user = await this.usersService.findOneById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return user;
  }
  async create(createGardenInfoDto: CreateGardenInfoDto) {
    const {userId, treeType, numOfTree, longitude, latitude} = createGardenInfoDto;
    const isExistUser = await this.IsExistThisUser(userId);
    if (!isExistUser) {
      throw new BadRequestException('User not found');
    }

    const isExist = await this.IsExistThisUserId(userId);
    if(isExist) {     
      throw new BadRequestException('This user already has a garden');
    } 

    const gardenInfo = await this.gardenInfoModel.create({
      userId, treeType, numOfTree, longitude, latitude
    })

    return {
      _id: gardenInfo._id,
      userId: gardenInfo.userId,
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const {filter, sort} = aqp(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.gardenInfoModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;

    const gardenInfos = await this.gardenInfoModel
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

  async findOne(id: number) {
    return await this.gardenInfoModel.findById(id);
  }

  async update(id: number, updateGardenInfoDto: UpdateGardenInfoDto) {
    return await this.gardenInfoModel.updateOne({
      _id: updateGardenInfoDto._id
    }, updateGardenInfoDto);
  }

  async remove(_id: string) {
    if (mongoose.isValidObjectId(_id)) {
      return this.gardenInfoModel.deleteOne({ _id: _id });
    }
    else{
      throw new BadRequestException('Invalid id');
    }
  }
}
