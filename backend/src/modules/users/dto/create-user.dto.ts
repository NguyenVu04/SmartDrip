import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;
    @IsNotEmpty({message: 'Email is required'})
    @IsEmail({}, {message: 'Invalid email'})       
    email: string;

    @IsNotEmpty({message: 'Password is required'})
    password: string;

    phoneNumber: string;
    address: string;
    

}
