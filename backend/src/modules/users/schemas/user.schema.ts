import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop()
    phoneNumber: string

    @Prop()
    password: string

    @Prop()
    email: string

    @Prop()
    address: string
    
    @Prop({default: 'LOCAL'})
    accountType: string

    @Prop({default: false})
    isActive: boolean

    @Prop({default: 'USERS'})
    role: string

    @Prop()
    codeId: string

    @Prop()
    codeExpired: Date;

    private _id: any;
}
export const UserSchema = SchemaFactory.createForClass(User);

