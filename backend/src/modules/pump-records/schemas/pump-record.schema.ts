import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import dayjs from "dayjs";
import { HydratedDocument } from "mongoose";

export type PumpRecordDocument = HydratedDocument<PumpRecord>;
@Schema()
export class PumpRecord {
    @Prop()
    @IsNotEmpty()
    userId: string

    @Prop()
    pump: number

    @Prop({
        default: dayjs().toDate()
    })
    timestamp: Date
}

export const PumpRecordSchema = SchemaFactory.createForClass(PumpRecord);