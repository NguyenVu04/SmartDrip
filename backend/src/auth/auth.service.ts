import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { comparePasswordHelper } from 'src/helpers/util/util';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';
import { UserDocument } from 'src/modules/users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string) : Promise<any> {
    const user:any  = await this.userService.findOneByEmail(username);
    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password');
    }

    const payload = { sub: user.id, username: user.email };

    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user:any = await this.userService.findOneByEmail(username);
    if (!user)
      return null
    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) {
      return null;
    }

    return user;
  }

  async login(user: any) {
    const payload = {username : user.email, sub: user._id};
      
    return {
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      access_token: await this.jwtService.sign(payload),
    }
  }

  async register(resgisterDto: CreateAuthDto){
    
    return await this.userService.handleRegister(resgisterDto)
  }

  async verify(_id: string, codeId: string){
    // find user by _id
    const user : any = await this.userService.findOneById(_id) as UserDocument | null;
    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    console.log(user.codeId)
    if (user.isActive === true){
      throw new UnauthorizedException('This account is already activated!')
    }
    // check if codeId is valid
    if (user?.codeId !== codeId) {
      throw new UnauthorizedException('Invalid codeId');
    }

    // trigger isActive to true
    return this.userService.activateUser(_id)
  }
}
