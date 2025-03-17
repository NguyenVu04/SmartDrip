import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { JwtAuthGuard } from './passport/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService
  ) {}


  @Post("login")
  @Public()
  @ResponseMessage("Login successfully")
  @UseGuards(LocalAuthGuard)
  async handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post("register")
  @Public()
  async register(@Body() registerDto: CreateAuthDto) {
    return await this.authService.register(registerDto);
  }

  @Get('mail')
  @Public()
  testMail() {
    this.mailerService.sendMail({
      to: 'hoi.phan1712@hcmut.edu.vn',
      subject: 'Testing Nest MailerModule ✔',
      text: 'welcome',
      template: "register",
      context: {  
        name: "Yilongma",
        activationCode: 123123123
      }
    })
    .then(() => {
      console.log('mail sent');
    })

    return "ok";
  }
  
  // get me
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
