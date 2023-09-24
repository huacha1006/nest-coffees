import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, Like } from 'typeorm';
import { ApiException } from 'src/common/filters/http-exception/api.exception';
import { ApiErrorCode } from 'src/common/enums/api-error-code.enum';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  // 新增一个用户
  async create(createUserDto: CreateUserDto) {
    const { username } = createUserDto;
    const existUser = await this.user.findOne({
      where: { username },
    });

    if (existUser) {
      throw new ApiException('用户已存在', ApiErrorCode.USER_NOTEXIST);
    }

    try {
      const newUser = await this.user.create(createUserDto);
      await this.user.save(newUser);
      return '注册成功';
    } catch (err) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 创建验证码
  createCode() {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: 'white', //背景颜色
    });
    return captcha;
  }

  async findAll(query: { keyWord: string; pageSize: number; current: number }) {
    console.log(query, query.keyWord);
    const data = await this.user.find({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
      skip: (query.current - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.user.count({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
    });

    return {
      data,
      total,
    };
  }

  async findOne(username: string) {
    const user = await this.user.findOne({
      where: { username },
    });

    if (!user) throw new HttpException('用户名不存在', HttpStatus.BAD_REQUEST);
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(id, updateUserDto);
    return this.user.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.user.delete(id);
  }
}
