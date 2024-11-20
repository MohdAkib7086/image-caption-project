import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
// import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AppController } from './app.controller';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { appConstants } from '../constants';
import { AuthController } from './controller/auth.controller';
import { UserSchema } from './models/users.schema';
import { ChatSchema } from './models/chat.schema';
import { QnaService } from './services/qna.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
          user: 'retha.roob67@ethereal.email',
          pass: 'enPEM7dPpMEfWbeWs8',
        },
      },
    }),

    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),

    MongooseModule.forRoot(process.env.DB_URI),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Chat', schema: ChatSchema },
    ]),
    BookModule,
    PassportModule,
    JwtModule.register({
      secret: appConstants.jwtSecret,
      signOptions: { expiresIn: '20m' },
    }),
  ],
  controllers: [AppController, UsersController, AuthController],
  providers: [
    AppService,
    UsersService,
    JwtStrategy,
    LocalStrategy,
    AuthService,
    QnaService,
  ],
  exports: [
    AppService,
    UsersService,
    JwtStrategy,
    LocalStrategy,
    AuthService,
    QnaService,
  ],
})
export class AppModule {}
