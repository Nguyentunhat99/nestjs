import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  HttpStatus,
  Render,
  Req,
  HttpCode,
  Query,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SortUserDto } from './dto/sort-user.dto';
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async loginUser(@Body() user: CreateUserDto): Promise<any> {
    const { email, password } = user;
    return this.service.loginUser(email, password);
  }

  @Post('/create')
  async createUser(@Res() res: Response, @Body() user: CreateUserDto) {
    console.log(user.username?.toLowerCase());

    await this.service.createUser({
      ...user,
      username: user.username?.toLowerCase(),
      email: user.email?.toLowerCase(),
    });
    return res.redirect('/user/getAllUsers');
  }

  @Get('/getAllUsers')
  async index(
    @Res() res: Response,
    @Req() request: Request,
    @Query() sort: SortUserDto,
  ) {
    if (request.query.hasOwnProperty('_sort')) {
      const data = await this.service.sort(sort);

      return res.render('home.hbs', {
        data: data,
      });
    }
    const data = await this.service.findAll();
    return res.render('home.hbs', {
      data: data,
    });
  }

  @Get('/edit/:id')
  async findOne(@Res() res: Response, @Param('id') id: string) {
    const data = await this.service.findOne(id);
    const roles = await this.service.getRoles();
    return res.render('edit.hbs', {
      data: data,
      roles: roles,
    });
  }

  @Post('/update/:id')
  async update(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ) {
    await this.service.update(id, user);
    return res.redirect('/user/getAllUsers');
  }

  @Post('/delete-soft/:id')
  async delete(@Res() res: Response, @Param('id') id: string) {
    await this.service.delete(id);
    return res.redirect('/user/getAllUsers');
  }

  @Get('/trash')
  async trashUser(@Res() res: Response) {
    const data = await this.service.findTrashUser();
    return res.render('trash-user.hbs', {
      data: data,
    });
  }

  @Post('/destroy/:id')
  async destroy(@Res() res: Response, @Param('id') id: string) {
    await this.service.destroy(id);
    return res.redirect('/user/trash');
  }

  @Post('/restore/:id')
  async restore(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ) {
    await this.service.restore(id, user);
    return res.redirect('/user/getAllUsers');
  }

  @Post('/handle-action-form')
  async handleActionForm(@Res() res: Response, @Req() request: Request) {
    const { action, usersId } = request.body;
    await this.service.handleActionForm(action, usersId);
    return res.redirect('/user/getAllUsers');
  }

  @Post('/search')
  async Search(@Res() res: Response, @Req() request: Request) {
    const value = request.body.value.toLowerCase();
    const page = request.body.page;

    if (page === 'getAllUsers') {
      const data = await this.service.searchGetAllUsers(value);
      return res.render('home.hbs', {
        data: data,
      });
    }
    if (page === 'trashUsers') {
      const data = await this.service.searchTrashUsers(value);
      return res.render('trash-user.hbs', {
        data: data,
      });
    }
  }
}
