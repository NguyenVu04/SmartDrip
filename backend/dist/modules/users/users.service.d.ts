import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { MailerService } from '@nestjs-modules/mailer';
export declare class UsersService {
    private userModel;
    private readonly mailerService;
    constructor(userModel: Model<User>, mailerService: MailerService);
    isEmailExist: (email: string) => Promise<boolean>;
    create(createUserDto: CreateUserDto): Promise<{
        _id: any;
    }>;
    findAll(query: string, current: number, pageSize: number): Promise<{
        results: never[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }>;
    findOneByEmail(email: string): Promise<null>;
    findOneById(_id: string): Promise<null>;
    update(id: number, updateUserDto: UpdateUserDto): string;
    remove(_id: string): Promise<mongoose.mongo.DeleteResult>;
    handleRegister(registerDto: CreateUserDto): Promise<{
        _id: any;
    }>;
}
