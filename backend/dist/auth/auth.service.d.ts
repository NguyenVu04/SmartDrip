import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
export declare class AuthService {
    private userService;
    private jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    signIn(username: string, pass: string): Promise<any>;
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        user: {
            _id: any;
            name: any;
            email: any;
        };
        access_token: string;
    }>;
    register(resgisterDto: CreateAuthDto): Promise<{
        _id: any;
    }>;
}
