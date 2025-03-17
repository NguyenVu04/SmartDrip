import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateNotificationDto {
    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    timestamp: Date

    @IsOptional()
    content: string = ''

    @IsOptional()
    seen: boolean = false
}
