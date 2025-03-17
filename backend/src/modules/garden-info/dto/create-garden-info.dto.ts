import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateGardenInfoDto {
    @IsNotEmpty()
    // is unique id
    userId: string

    @IsOptional()
    treeType: string


    @IsOptional()
    numOfTree: number

    @IsOptional()
    longitude: number

    @IsOptional()
    latitude: number

    @IsOptional()
    cropStart: Date
}

// @Prop()
//     treeType: string

//     @Prop()
//     numOfTree: number

//     @Prop()
//     longitude: number

//     @Prop()
//     latitude: number

//     @Prop()
//     userId: string