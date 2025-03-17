import { PumpRecordsService } from './pump-records.service';
import { CreatePumpRecordDto } from './dto/create-pump-record.dto';
import { UpdatePumpRecordDto } from './dto/update-pump-record.dto';
export declare class PumpRecordsController {
    private readonly pumpRecordsService;
    constructor(pumpRecordsService: PumpRecordsService);
    create(createPumpRecordDto: CreatePumpRecordDto): Promise<{
        _id: any;
        userId: any;
    }>;
    findAll(query: string, current: string, pageSize: string): Promise<{
        results: (import("mongoose").Document<unknown, {}, import("./schemas/pump-record.schema").PumpRecord> & import("./schemas/pump-record.schema").PumpRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/pump-record.schema").PumpRecord> & import("./schemas/pump-record.schema").PumpRecord & {
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
