import { CreateTemperatureRecordDto } from './dto/create-temperature-record.dto';
import { UpdateTemperatureRecordDto } from './dto/update-temperature-record.dto';
import { TemperatureRecord } from './schemas/temperature-record.entity';
import { UsersService } from '../users/users.service';
import { Model } from 'mongoose';
export declare class TemperatureRecordsService {
    private temperatureRecordModel;
    private usersService;
    constructor(temperatureRecordModel: Model<TemperatureRecord>, usersService: UsersService);
    create(createTemperatureRecordDto: CreateTemperatureRecordDto): Promise<{
        _id: any;
        userId: any;
    }>;
    findAll(query: string, current: number, pageSize: number): Promise<{
        results: (import("mongoose").Document<unknown, {}, TemperatureRecord> & TemperatureRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, TemperatureRecord> & TemperatureRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id: number, updateTemperatureRecordDto: UpdateTemperatureRecordDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        userId: string;
    }>;
    remove(id: string): Promise<{
        _id: import("mongoose").Types.ObjectId;
        userId: string;
    }>;
}
