import { TemperatureRecordsService } from './temperature-records.service';
import { CreateTemperatureRecordDto } from './dto/create-temperature-record.dto';
import { UpdateTemperatureRecordDto } from './dto/update-temperature-record.dto';
export declare class TemperatureRecordsController {
    private readonly temperatureRecordsService;
    constructor(temperatureRecordsService: TemperatureRecordsService);
    create(createTemperatureRecordDto: CreateTemperatureRecordDto): Promise<{
        _id: any;
        userId: any;
    }>;
    findAll(query: string, current: string, pageSize: string): Promise<{
        results: (import("mongoose").Document<unknown, {}, import("./schemas/temperature-record.entity").TemperatureRecord> & import("./schemas/temperature-record.entity").TemperatureRecord & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/temperature-record.entity").TemperatureRecord> & import("./schemas/temperature-record.entity").TemperatureRecord & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id: string, updateTemperatureRecordDto: UpdateTemperatureRecordDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        userId: string;
    }>;
    remove(id: string): Promise<{
        _id: import("mongoose").Types.ObjectId;
        userId: string;
    }>;
}
