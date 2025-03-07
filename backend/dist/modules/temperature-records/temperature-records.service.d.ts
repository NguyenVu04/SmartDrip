import { CreateTemperatureRecordDto } from './dto/create-temperature-record.dto';
import { UpdateTemperatureRecordDto } from './dto/update-temperature-record.dto';
export declare class TemperatureRecordsService {
    create(createTemperatureRecordDto: CreateTemperatureRecordDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateTemperatureRecordDto: UpdateTemperatureRecordDto): string;
    remove(id: number): string;
}
