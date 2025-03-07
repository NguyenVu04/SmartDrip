import { CreateMoistureRecordDto } from './dto/create-moisture-record.dto';
import { UpdateMoistureRecordDto } from './dto/update-moisture-record.dto';
export declare class MoistureRecordsService {
    create(createMoistureRecordDto: CreateMoistureRecordDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateMoistureRecordDto: UpdateMoistureRecordDto): string;
    remove(id: number): string;
}
