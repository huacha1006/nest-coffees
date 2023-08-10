import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ description: '账号' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  readonly password: string;

  @ApiProperty({ description: '验证码' })
  @IsString()
  readonly code: string;
}

export class CreateUserDto {
  @ApiProperty({ description: '账号' })
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '手机号' })
  @IsString()
  readonly phone: string;

  @ApiProperty({ description: '年龄' })
  @IsNumber()
  readonly age: number;

  @ApiProperty({ description: '手机号' })
  @IsNumber()
  readonly sex: number;
}
