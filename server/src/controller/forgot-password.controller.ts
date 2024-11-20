import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth/forgot-password')
export class ForgotPasswordController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async forgotPassword(@Body('email') email: string): Promise<void> {
    try {
      await this.authService.sendPasswordResetEmail(email);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
