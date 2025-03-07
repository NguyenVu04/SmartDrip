import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import dayjs from "dayjs";
import { HydratedDocument } from "mongoose";


export type MoistureRecordDocument = HydratedDocument<MoistureRecord>;
@Schema()
export class MoistureRecord {
    @Prop()
    @IsNotEmpty()
    userId: string

    @Prop()
    moisture: number

    @Prop({
        default: dayjs().toDate()
    })
    timestamp: Date

}

export const MoistureRecordSchema = SchemaFactory.createForClass(MoistureRecord);
