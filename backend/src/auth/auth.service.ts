import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { comparePasswordHelper } from 'src/helpers/util/util';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

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
}
