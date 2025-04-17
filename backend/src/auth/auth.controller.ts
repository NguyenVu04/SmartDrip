import { Controller, Get, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto, VerifyAuthDto } from './dto/create-auth.dto';
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

  @Public()
  @Post('verify')
/*************  ✨ Windsurf Command ⭐  *************/
/**
 * Verifies the user by checking the provided user ID and code ID.
 * 
 * @param verifyDto - Data transfer object containing the user ID and code ID.
 * @returns A promise that resolves to the verification result.
 */

/*******  61e6544d-eb2e-48cf-aa9a-ecf048f6f445  *******/
  async verify(@Body() verifyDto: VerifyAuthDto) {
    return await this.authService.verify(verifyDto._id, verifyDto.codeId);
  }
}
