import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import dayjs from "dayjs";
import { HydratedDocument } from "mongoose";

export type TemperatureRecordDocument = HydratedDocument<TemperatureRecord>;

@Schema()
export class TemperatureRecord {
    @Prop()
    @IsNotEmpty()
    userId: string

    @Prop()
    temperature: number

    @Prop({
        default: dayjs().toDate()
    })
    timestamp: Date
}

export const TemperatureRecordSchema = SchemaFactory.createForClass(TemperatureRecord);
