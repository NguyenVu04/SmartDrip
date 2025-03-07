import { MoistureRecordsService } from './moisture-records.service';
import { CreateMoistureRecordDto } from './dto/create-moisture-record.dto';
import { UpdateMoistureRecordDto } from './dto/update-moisture-record.dto';
export declare class MoistureRecordsController {
    private readonly moistureRecordsService;
    constructor(moistureRecordsService: MoistureRecordsService);
    create(createMoistureRecordDto: CreateMoistureRecordDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMoistureRecordDto: UpdateMoistureRecordDto): string;
    remove(id: string): string;
}
