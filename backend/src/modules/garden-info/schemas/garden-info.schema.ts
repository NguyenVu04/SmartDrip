import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsNotEmpty } from "class-validator";
import dayjs from "dayjs";
import { HydratedDocument } from "mongoose";

export type GardenInfoDocument = HydratedDocument<GardenInfo>;

@Schema()
export class GardenInfo {
    @Prop()
    treeType: string = 'Wheat'

    @Prop()
    numOfTree: number

    @Prop()
    longitude: number

    @Prop()
    latitude: number

    @Prop()
    cropStart: Date = dayjs().toDate()

    @Prop()
    @IsNotEmpty()
    userId: string
}


export const GardenInfoSchema = SchemaFactory.createForClass(GardenInfo);