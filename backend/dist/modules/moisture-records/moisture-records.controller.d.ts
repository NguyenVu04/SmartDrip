import { MoistureRecordsService } from './moisture-records.service';
import { CreateMoistureRecordDto } from './dto/create-moisture-record.dto';
import { UpdateMoistureRecordDto } from './dto/update-moisture-record.dto';
export declare class MoistureRecordsController {
    private readonly moistureRecordsService;
    constructor(moistureRecordsService: MoistureRecordsService);
    create(createMoistureRecordDto: CreateMoistureRecordDto): Promise<{
        _id: any;
        userId: any;
    }>;
    findAll(query: string, current: string, pageSize: string): Promise<{
        results: (import("mongoose").Document<unknown, {}, import("./schemas/moisture-record.schema").MoistureRecord> & import("./schemas/moisture-record.schema").MoistureRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/moisture-record.schema").MoistureRecord> & import("./schemas/moisture-record.schema").MoistureRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id: string, updateMoistureRecordDto: UpdateMoistureRecordDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        userId: string;
    }>;
    remove(id: string): Promise<any>;
}
