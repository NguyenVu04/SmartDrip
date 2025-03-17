import { IsNotEmpty, IsOptional } from "class-validator"

export class UpdateMqttDto {
    @IsOptional()
    aioKey: string
    @IsOptional()
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
