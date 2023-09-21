import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Req,
  Session,
  Inject,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
import { Public } from 'src/common/decorators/public.decorator';
import session from 'express-session';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject('Test') private readonly shop: string[],
    @Inject('Config') private readonly base: { baseUrl: string },
  ) {}

  @Public()
  @Get()
  findAll(
    @Query() query: { keyWord: string; pageSize: number; current: number },
  ) {
    return this.userService.findAll(query);
  }

  // 获取登陆验证码
  @Public()
  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const code = this.userService.createCode();
    session.code = code.text;
    console.log('code', code.text);
    res.type('image/svg+xml');
    res.send(code.data);
  }

  // 登陆
  @Public()
  @Post('create')
  login(@Body() createUserDto: LoginUserDto, @Session() session) {
    console.log(createUserDto, session);
    const requestCode = createUserDto.code.toLocaleLowerCase();
    const code = session.code.toLocaleLowerCase();
    if (requestCode === code) {
      return {
        code: 200,
        message: '验证码正确',
      };
    } else {
      return {
        code: 200,
        message: '验证码错误',
      };
    }
  }

  @Public()
  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Public()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Public()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
