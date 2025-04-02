import { CreateMoistureRecordDto } from './dto/create-moisture-record.dto';
import { UpdateMoistureRecordDto } from './dto/update-moisture-record.dto';
import { MoistureRecord } from './schemas/moisture-record.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
export declare class MoistureRecordsService {
    private moistureRecordModel;
    private usersService;
    constructor(moistureRecordModel: Model<MoistureRecord>, usersService: UsersService);
    create(createMoistureRecordDto: CreateMoistureRecordDto): Promise<{
        _id: any;
        userId: any;
    }>;
    findAll(query: string, current: number, pageSize: number): Promise<{
        results: (import("mongoose").Document<unknown, {}, MoistureRecord> & MoistureRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, MoistureRecord> & MoistureRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id: string, updateMoistureRecordDto: UpdateMoistureRecordDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        userId: string;
    }>;
    remove(id: number): Promise<any>;
}
