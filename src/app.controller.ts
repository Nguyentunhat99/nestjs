import {
  Body,
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  HttpCode,
  Req,
  UseGuards,
  Render,
} from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Response, Request } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly AuthService: AuthService,
  ) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world 123!' };
  }

  //passport
  @UseGuards(LocalAuthGuard)
  @Post('passport/login')
  async login(@Req() request: Request) {
    return this.AuthService.login(request.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() request: Request) {
    return request.user;
  }
}
