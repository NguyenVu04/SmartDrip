import { IsNotEmpty, IsOptional } from "class-validator"

export class CreatePumpRecordDto {

    @IsNotEmpty()
    userId: string

    @IsOptional()
    pump: number

    @IsOptional()
    timestamp: Date
}
