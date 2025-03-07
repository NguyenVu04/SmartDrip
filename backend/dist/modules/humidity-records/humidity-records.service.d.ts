import { CreateHumidityRecordDto } from './dto/create-humidity-record.dto';
import { UpdateHumidityRecordDto } from './dto/update-humidity-record.dto';
import { HumidityRecord } from './schemas/humidity-record.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
export declare class HumidityRecordsService {
    private humidityRecordModel;
    private readonly usersService;
    constructor(humidityRecordModel: Model<HumidityRecord>, usersService: UsersService);
    checkIfThisUserIdExists(userId: string): Promise<void>;
    create(createHumidityRecordDto: CreateHumidityRecordDto): Promise<{
        _id: any;
        userId: any;
    }>;
    findAll(query: string, current: number, pageSize: number): Promise<{
        results: (import("mongoose").Document<unknown, {}, HumidityRecord> & HumidityRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, HumidityRecord> & HumidityRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(updateHumidityRecordDto: UpdateHumidityRecordDto): Promise<{
        _id: any;
    }>;
    remove(_id: string): Promise<import("mongodb").DeleteResult>;
}
