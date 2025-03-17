import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { UsersService } from '../users/users.service';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';
import { Notification } from './schemas/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
    private readonly usersService: UsersService
  ){}

  async IsExistThisUser(userId: string) {
    const user = await this.usersService.findOneById(userId);
    return user;
  }
  async create(createNotificationDto: CreateNotificationDto) {
    // check if user exist 
    const isExistUser = await this.IsExistThisUser(createNotificationDto.userId);
    if (!isExistUser) {
      throw new BadRequestException('User not found');
    }
    // create notification
    const notification = await this.notificationModel.create(createNotificationDto);

    return {
      _id: notification._id,
      userId: notification
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const {filter, sort} = aqp(query);

    if (filter.current) delete filter.current;
    if (filter.pageSize) delete filter.pageSize;

    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.notificationModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const skip = (current - 1) * pageSize;

    const gardenInfos = await this.notificationModel
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

  async findOne(_id: string) {
    return await this.notificationModel.findById(_id)
  }

  async findByUserId(userId: string, current: number, pageSize: number) {
    if (!current) current = 1;
    if (!pageSize) pageSize = 10;

    const totalItems = (await this.notificationModel.find({userId})).
    length;
    const totalPages = Math.ceil(totalItems / pageSize);

    const skip = (current - 1) * pageSize;

    const notifications = await this.notificationModel
    .find({userId})

    return {
      notifications,
      totalItems,
      totalPages,
      current,
      pageSize
    }
  }

  async update(updateNotificationDto: UpdateNotificationDto) {
    const find = await this.notificationModel.findById(updateNotificationDto._id);

    if (!find) {
      throw new BadRequestException('Notification not found');
    }

    console.log(find);

    return await this.notificationModel.updateOne({
      _id: updateNotificationDto._id
    }, updateNotificationDto);
  }

  async remove(_id: string) {
    if (mongoose.isValidObjectId(_id)) {
      return await this.notificationModel.deleteOne({ _id });
    } else {
      throw new BadRequestException('Invalid id');
    }
  }
}
