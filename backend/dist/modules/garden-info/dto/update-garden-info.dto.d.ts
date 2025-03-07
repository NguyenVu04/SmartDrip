import { CreateGardenInfoDto } from './create-garden-info.dto';
declare const UpdateGardenInfoDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateGardenInfoDto>>;
export declare class UpdateGardenInfoDto extends UpdateGardenInfoDto_base {
    _id: string;
    treeType: string;
    longitude: number;
    latitude: number;
    numOfTree: number;
}
export {};
