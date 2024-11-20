import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';

import { UsersService } from 'src/users/users.service';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/models/users.schema';
import { MailerService } from '@nestjs-modules/mailer';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    @InjectModel('User')
    private readonly userModel: mongoose.Model<User>,
    private mailerService: MailerService, // private mailerService: MailerService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(
      `[AuthService] validateUser: email=${email}, password=${password}`,
    );
    return await this.usersService.validateUser(email, password);
  }

  async login(user: any) {
    console.log(`[AuthService] login: user=${JSON.stringify(user)}`);
    const payload = { email: user.email, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
      email: user.email,
      name: user.name,
    };
  }

  async register(user: any) {
    try {
      console.log(user);
      const email = user.email;
      const password = user.password;
      const name = user.name;
      console.log(
        `[AuthService] register: email=${email}, name=${name}, password=${password}`,
      );

      const newUser = new this.userModel({
        name,
        email,
        password,
        resetPasswordToken: null, // Set the token value here
        resetPasswordExpires: null,
      });
      return await newUser.save();
    } catch (error) {
      return error;
    }
  }

  async sendPasswordResetEmail(email: string): Promise<void> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const resetToken = uuidv4(); // Generate a unique reset token
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
    await user.save();

    const resetLink = `${process.env.CORS_ALLOWED_ORIGIN}/reset-password?token=${resetToken}`;
    const emailContent = `Dear User, \n\nTo reset your password, please click on the following link: \n\n${resetLink}`;

    // Send email
    console.log(`[AuthService] sendPasswordResetEmail: ${emailContent}`);
    const result = await this.mailerService.sendMail({
      to: email,
      subject: 'Password Reset Request',
      text: emailContent,
    });

    return result;
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const user = await this.userModel.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    console.log(`[AuthService] resetPassword: user=${user}`);

    if (!user) {
      throw new Error('Invalid or expired reset token');
    }

    const updatedUser = await this.userModel.findOneAndUpdate(
      { resetPasswordToken: token },
      {
        password: newPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },
      { new: true },
    );

    console.log(updatedUser);
  }

  async myProfile(email: string) {
    console.log(`[AuthService] getProfile: email=${email}`);
    return await this.userModel.findOne({email});
  }
}
