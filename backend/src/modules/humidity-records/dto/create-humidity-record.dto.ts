import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateHumidityRecordDto {
    // @Prop()
    //     humidity: number
    
    //     @Prop()
    //     userId: string
    
    //     @Prop()
    //     timestamp: Date
    @IsOptional()
    humidity: number;

    @IsNotEmpty()
    userId: string;

    @IsOptional()
    timestamp: Date;
}
