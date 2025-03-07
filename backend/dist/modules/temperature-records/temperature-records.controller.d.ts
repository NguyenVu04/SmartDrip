import { TemperatureRecordsService } from './temperature-records.service';
import { CreateTemperatureRecordDto } from './dto/create-temperature-record.dto';
import { UpdateTemperatureRecordDto } from './dto/update-temperature-record.dto';
export declare class TemperatureRecordsController {
    private readonly temperatureRecordsService;
    constructor(temperatureRecordsService: TemperatureRecordsService);
    create(createTemperatureRecordDto: CreateTemperatureRecordDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTemperatureRecordDto: UpdateTemperatureRecordDto): string;
    remove(id: string): string;
}
