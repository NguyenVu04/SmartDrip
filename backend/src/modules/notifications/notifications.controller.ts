import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get()
  async findAll(
    @Query() query: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string,
  ) {
    return this.notificationsService.findAll(query, +current, +pageSize);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.notificationsService.findOne(id);
  }

  @Get('userId')
  async findByUserId(
    @Query('userId') userId: string,
    @Query("current") current: string,
    @Query("pageSize") pageSize: string,
  
  ) {
    return this.notificationsService.findByUserId(userId, +current, +pageSize);
  }
  @Patch()
  async update(@Body() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationsService.update(updateNotificationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<any> {
    return this.notificationsService.remove(id);  
  }
}
