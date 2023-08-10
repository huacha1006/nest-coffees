import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly user: Repository<User>,
  ) {}

  // 新增一个用户
  create(createUserDto: CreateUserDto) {
    const data = new User();
    data.name = createUserDto.name;
    data.phone = createUserDto.phone;
    data.age = createUserDto.age;
    data.sex = createUserDto.sex;
    console.log(data);
    return this.user.save(data);
  }

  // 创建验证码
  createCode() {
    const captcha = svgCaptcha.create({
      size: 4, //生成几个验证码
      fontSize: 50, //文字大小
      width: 100, //宽度
      height: 34, //高度
      background: '#cc9966', //背景颜色
    });
    return captcha;
  }

  findAll(query: { keyWord: string }) {
    console.log(query, query.keyWord);
    return this.user.find({
      where: {
        name: Like(`%${query.keyWord}%`),
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
