import { CreatePumpRecordDto } from './dto/create-pump-record.dto';
import { UpdatePumpRecordDto } from './dto/update-pump-record.dto';
export declare class PumpRecordsService {
    create(createPumpRecordDto: CreatePumpRecordDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updatePumpRecordDto: UpdatePumpRecordDto): string;
    remove(id: number): string;
}
