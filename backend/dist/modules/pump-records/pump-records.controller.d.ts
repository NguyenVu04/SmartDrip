import { PumpRecordsService } from './pump-records.service';
import { CreatePumpRecordDto } from './dto/create-pump-record.dto';
import { UpdatePumpRecordDto } from './dto/update-pump-record.dto';
export declare class PumpRecordsController {
    private readonly pumpRecordsService;
    constructor(pumpRecordsService: PumpRecordsService);
    create(createPumpRecordDto: CreatePumpRecordDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updatePumpRecordDto: UpdatePumpRecordDto): string;
    remove(id: string): string;
}
