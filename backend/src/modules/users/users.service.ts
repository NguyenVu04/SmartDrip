import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
import { hashPasswordHelper } from 'src/helpers/util/util';
import aqp from 'api-query-params';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly mailerService: MailerService,
  ){}

  isEmailExist = async (email: string) => {
    const isExist = await this.userModel.exists({ email });
    if (isExist) {
      return true;
    }
    return false;
  }
  async create(createUserDto: CreateUserDto) {
    const {firstName, lastName, email, password, phoneNumber, address} = createUserDto
    const isExist = await this.isEmailExist(email);

    if (isExist) {
      throw new BadRequestException(`Email ${email} already exists`);
    }
    const hashedPassword = await hashPasswordHelper(createUserDto.password)
    const user: any = await this.userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phoneNumber,
      address
    })

    return {
      _id: user._id,
    }
  }

  async findAll(query: string, current: number, pageSize: number) {
    const { filter, sort } = aqp(query)

    if (filter.current) delete filter.current
    if (filter.pageSize) delete filter.pageSize

    if (!current) current = 1
    if (!pageSize) pageSize = 10

    const totalItems = (await this.userModel.find(filter)).length
    const totalPages = Math.ceil(totalItems / pageSize)
    const skip = (current - 1) * pageSize

    const results = await this.userModel
    .find(filter)
    .limit(pageSize)
    .skip(skip)
    .select('-password')
    .sort(sort as any)

    return {
      results,
      totalItems,
      totalPages,
      current,
      pageSize
    }
  }
  async findOneByEmail(email: string) {
    return await this.userModel.findOne({email})
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(_id:  string) {
    if (mongoose.isValidObjectId(_id)) {
      return this.userModel.deleteOne({ _id })
    }
    else{
      throw new BadRequestException(`Invalid id ${_id}`)
    }
  }

  async handleRegister(registerDto: CreateUserDto) {
    const {firstName, lastName,  email, password} = registerDto
    // check email

    const isExist = await this.isEmailExist(email)
    if (isExist) {
      throw new BadRequestException(`Email already exist: ${email}. Please use another email`)
    }
    const hashedPassword = await hashPasswordHelper(registerDto.password)
    const codeId = uuidv4();
    const user :any = await this.userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isActive: false,
      codeId: codeId,
      codeExpired: dayjs().add(30, 'seconds')
    })
    this.mailerService.sendMail({
      to: email,
      subject: 'Activate your account at @DaiViet',
      template: "register",
      context: {
        name: firstName?? email,
        activationCode: codeId
      }
    })
    return {
      _id: user._id,
    }
  }
}
