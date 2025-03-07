import { CreatePumpRecordDto } from './dto/create-pump-record.dto';
import { UpdatePumpRecordDto } from './dto/update-pump-record.dto';
import { PumpRecord } from './schemas/pump-record.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
export declare class PumpRecordsService {
    private pumpRecordsModel;
    private usersService;
    constructor(pumpRecordsModel: Model<PumpRecord>, usersService: UsersService);
    create(createPumpRecordDto: CreatePumpRecordDto): Promise<{
        _id: any;
        userId: any;
    }>;
    findAll(query: string, current: number, pageSize: number): Promise<{
        results: (import("mongoose").Document<unknown, {}, PumpRecord> & PumpRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, PumpRecord> & PumpRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id: string, updatePumpRecordDto: UpdatePumpRecordDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        userId: string;
    }>;
    remove(id: string): Promise<string>;
}
