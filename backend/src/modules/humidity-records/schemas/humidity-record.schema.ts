import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import dayjs from "dayjs";
import { HydratedDocument } from "mongoose";

export type HumidityRecordDocument = HydratedDocument<HumidityRecord>;

@Schema()
export class HumidityRecord {
    @Prop()
    humidity: number

    @Prop()
    userId: string

    @Prop({
        default: dayjs().toDate()
    })
    timestamp: Date
}


export const HumidityRecordSchema = SchemaFactory.createForClass(HumidityRecord);