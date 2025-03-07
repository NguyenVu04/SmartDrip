import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type GardenInfoDocument = HydratedDocument<GardenInfo>;

@Schema()
export class GardenInfo {
    @Prop()
    treeType: string

    @Prop()
    numOfTree: number

    @Prop()
    longitude: number

    @Prop()
    latitude: number

    @Prop()
    userId: string
}


export const GardenInfoSchema = SchemaFactory.createForClass(GardenInfo);