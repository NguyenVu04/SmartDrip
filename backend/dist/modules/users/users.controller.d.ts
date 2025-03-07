import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        _id: any;
    }>;
    findAll(query: string, current: string, pageSize: string): Promise<{
        results: never[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }>;
    findOneById(id: string): Promise<null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<string>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
}
