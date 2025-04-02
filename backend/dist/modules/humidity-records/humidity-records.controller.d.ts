import { HumidityRecordsService } from './humidity-records.service';
import { CreateHumidityRecordDto } from './dto/create-humidity-record.dto';
import { UpdateHumidityRecordDto } from './dto/update-humidity-record.dto';
export declare class HumidityRecordsController {
    private readonly humidityRecordsService;
    constructor(humidityRecordsService: HumidityRecordsService);
    create(createHumidityRecordDto: CreateHumidityRecordDto): Promise<{
        _id: any;
        userId: any;
    }>;
    findAll(query: string, current: string, pageSize: string): Promise<{
        results: (import("mongoose").Document<unknown, {}, import("./schemas/humidity-record.schema").HumidityRecord> & import("./schemas/humidity-record.schema").HumidityRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/humidity-record.schema").HumidityRecord> & import("./schemas/humidity-record.schema").HumidityRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(updateHumidityRecordDto: UpdateHumidityRecordDto): Promise<{
        _id: any;
    }>;
    remove(_id: string): Promise<any>;
}
