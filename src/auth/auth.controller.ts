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
} from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthGuard } from './auth.guard';

import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async loginUser(@Body() user: CreateUserDto): Promise<object> {
    const { email, password } = user;
    return this.AuthService.login(email, password);
  }

  @Post('/register')
  async register(
    @Res() res: Response,
    @Body() user: CreateUserDto,
  ): Promise<object> {
    const data = await this.AuthService.register({
      ...user,
      username: user.username?.toLowerCase(),
    });
    return res.status(HttpStatus.CREATED).json(data);
  }

  @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Req() request: Request) {
    // return request.user;
  }
}
