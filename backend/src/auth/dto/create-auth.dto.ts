import { IsEmail, IsNotEmpty, IsOptional } from "class-validator";

export class CreateAuthDto {

    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Email is invalid'})
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    password: string;

    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;

    @IsOptional()
    phoneNumber: string;

    @IsOptional()
    address: string;
}


export class VerifyAuthDto {
    @IsNotEmpty({message: 'User id is required'})
    _id: string;

    @IsNotEmpty({message: 'Code is required'})
    codeId: string;
}