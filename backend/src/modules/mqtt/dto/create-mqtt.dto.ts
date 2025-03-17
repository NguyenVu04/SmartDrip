import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateMqttDto {
    
    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    aioKey: string

    @IsNotEmpty()
    aioUsername: string

    @IsOptional()
    pumpFeed: string
    
    @IsOptional()
    temperatureFeed: string
    
    @IsOptional()
    moistureFeed: string
    
    @IsOptional()
    humidityFeed: string
}
