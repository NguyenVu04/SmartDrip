import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type NotificationDocument = HydratedDocument<Notification>;

@Schema()
export class Notification {
    @Prop()
    timestamp: Date

    @Prop()
    content: string

    @Prop()
    userId: string

    @Prop()
    seen: boolean
}


export const NotificationSchema = SchemaFactory.createForClass(Notification);