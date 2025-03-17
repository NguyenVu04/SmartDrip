import { IsNotEmpty, IsOptional } from "class-validator";
import dayjs from "dayjs";

export class CreateNotificationDto {
    @IsNotEmpty()
    userId: string

    @IsOptional()
    timestamp: Date = dayjs().toDate()

    @IsOptional()
    content: string = ''

    @IsOptional()
    seen: boolean = false
}
