import { CreateGardenInfoDto } from './dto/create-garden-info.dto';
import { UpdateGardenInfoDto } from './dto/update-garden-info.dto';
import { GardenInfo } from './schemas/garden-info.schema';
import mongoose, { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
export declare class GardenInfoService {
    private gardenInfoModel;
    private readonly usersService;
    constructor(gardenInfoModel: Model<GardenInfo>, usersService: UsersService);
    IsExistThisUserId(userId: string): Promise<{
        _id: mongoose.Types.ObjectId;
    } | null>;
    IsExistThisUser(userId: string): Promise<never>;
    create(createGardenInfoDto: CreateGardenInfoDto): Promise<{
        _id: mongoose.Types.ObjectId;
        userId: string;
    }>;
    findAll(query: string, current: number, pageSize: number): Promise<{
        gardenInfos: (mongoose.Document<unknown, {}, GardenInfo> & GardenInfo & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }>;
    findOne(id: string): Promise<(mongoose.Document<unknown, {}, GardenInfo> & GardenInfo & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id: number, updateGardenInfoDto: UpdateGardenInfoDto): Promise<mongoose.UpdateWriteOpResult>;
    remove(_id: string): Promise<mongoose.mongo.DeleteResult>;
}
