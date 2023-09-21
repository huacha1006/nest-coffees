import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({ description: '账号' })
  @IsString()
  readonly username: string;

  @ApiProperty({ description: '密码' })
  @IsString()
  readonly password: string;
}
