import {
  Controller,
  Get,
  Request,
  Post,
  UseGuards,
  Body,
  Res,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { AuthService } from 'src/services/auth.service';
import { QnaService } from 'src/services/qna.service';
import * as https from 'https';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private qnaService: QnaService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    console.log(`[AuthController] login`);
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(@Request() req) {
    console.log(`[AuthController] login`);
    return this.authService.register(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(`[AuthController] getProfile`);
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('/qna')
  async qna(@Body() body: any, @Res() response: any) {
    try {
      console.log(body);
      const data = await this.qnaService.qna(body);
      console.log('hhhh');
      response.status(HttpStatus.OK).json(data.data);
    } catch (error) {
      if (error?.message)
        response
          .status(HttpStatus.INTERNAL_SERVER_ERROR)
          .json({ error: error.message });
      else response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error });
    }
  }

  @Post('forgot-password')
  async forgotPassword(
    @Body('email') email: string,
    @Res() response: any,
  ): Promise<void> {
    try {
      const res = await this.authService.sendPasswordResetEmail(email);
      console.log(res);
      response.status(HttpStatus.OK).json({ message: 'Email sent' });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('reset-password?:token')
  async resetPassword(
    @Body('token') token: string,
    @Body('password') password: string,
    @Res() response: any,
  ): Promise<void> {
    try {
      const res = await this.authService.resetPassword(token, password);
      console.log(res);
      response.status(HttpStatus.OK).json({ message: 'Password reset' });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('my-profile')
  async myProfile(@Request() req) {
    console.log(`[AuthController] myProfile`);
    return this.authService.myProfile(req.body.email);
  }
}
