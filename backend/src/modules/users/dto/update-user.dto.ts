import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
    @IsMongoId({message: 'Invalid ID'})
    @IsNotEmpty({message: 'User ID is required'})
    _id: string;

    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;

    @IsOptional()
    phoneNumber: string;

    @IsOptional()
    address: string;
    
        
}
