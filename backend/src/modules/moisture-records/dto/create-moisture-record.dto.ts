import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateMoistureRecordDto {
    // @Prop()
    // @IsNotEmpty()
    // userId: string

    // @Prop()
    // moisture: number

    // @Prop()
    // timestamp: Date
    
    @IsNotEmpty()
    userId: string
    
    @IsOptional()
    moisture: number
    
    @IsOptional()
    timestamp: Date

}
