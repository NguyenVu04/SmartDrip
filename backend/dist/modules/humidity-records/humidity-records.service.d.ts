import { CreateHumidityRecordDto } from './dto/create-humidity-record.dto';
import { UpdateHumidityRecordDto } from './dto/update-humidity-record.dto';
export declare class HumidityRecordsService {
    create(createHumidityRecordDto: CreateHumidityRecordDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateHumidityRecordDto: UpdateHumidityRecordDto): string;
    remove(id: number): string;
}
