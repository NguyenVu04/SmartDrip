import { HumidityRecordsService } from './humidity-records.service';
import { CreateHumidityRecordDto } from './dto/create-humidity-record.dto';
import { UpdateHumidityRecordDto } from './dto/update-humidity-record.dto';
export declare class HumidityRecordsController {
    private readonly humidityRecordsService;
    constructor(humidityRecordsService: HumidityRecordsService);
    create(createHumidityRecordDto: CreateHumidityRecordDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateHumidityRecordDto: UpdateHumidityRecordDto): string;
    remove(id: string): string;
}
