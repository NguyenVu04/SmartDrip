import { HydratedDocument } from "mongoose";
export type GardenInfoDocument = HydratedDocument<GardenInfo>;
export declare class GardenInfo {
    treeType: string;
    numOfTree: number;
    longitude: number;
    latitude: number;
    userId: string;
}
export declare const GardenInfoSchema: import("mongoose").Schema<GardenInfo, import("mongoose").Model<GardenInfo, any, any, any, import("mongoose").Document<unknown, any, GardenInfo> & GardenInfo & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, GardenInfo, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<GardenInfo>> & import("mongoose").FlatRecord<GardenInfo> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
