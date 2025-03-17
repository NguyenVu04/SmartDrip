import { GardenInfoService } from './garden-info.service';
import { CreateGardenInfoDto } from './dto/create-garden-info.dto';
import { UpdateGardenInfoDto } from './dto/update-garden-info.dto';
export declare class GardenInfoController {
    private readonly gardenInfoService;
    constructor(gardenInfoService: GardenInfoService);
    create(createGardenInfoDto: CreateGardenInfoDto): Promise<{
        _id: import("mongoose").Types.ObjectId;
        userId: string;
    }>;
    findAll(query: string, current: string, pageSize: string): Promise<{
        gardenInfos: (import("mongoose").Document<unknown, {}, import("./schemas/garden-info.schema").GardenInfo> & import("./schemas/garden-info.schema").GardenInfo & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }>;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schemas/garden-info.schema").GardenInfo> & import("./schemas/garden-info.schema").GardenInfo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null>;
    update(id: string, updateGardenInfoDto: UpdateGardenInfoDto): Promise<import("mongoose").UpdateWriteOpResult>;
}
