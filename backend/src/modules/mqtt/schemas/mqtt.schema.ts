import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type MqttDocument = HydratedDocument<Mqtt>;

@Schema()
export class Mqtt {
    
    @Prop()
    userId: string

    @Prop()
    aioKey: string

    @Prop()
    aioUsername: string

    @Prop()
    pumpFeed: string

    @Prop()
    temperatureFeed: string

    @Prop()
    moistureFeed: string

    @Prop()
    humidityFeed: string
}


export const MqttSchema = SchemaFactory.createForClass(Mqtt);