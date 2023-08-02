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
import { HasRoles } from './has-roles.decorator';
import { Role } from 'src/model/role.enum';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}
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
  //JWT
  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async loginUser(@Body() user: CreateUserDto): Promise<object> {
    const { email, password } = user;
    return this.AuthService.loginUser(email, password);
  }

  @Post('/refresh-token')
  async RefreshToken(
    @Res() res: Response,
    @Req() request: Request,
  ): Promise<object> {
    return this.AuthService.RefreshToken(request.body.refresh_token);
  }

  @HasRoles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/profile')
  getProfile(@Req() request: Request) {
    return request.user;
  }
}
