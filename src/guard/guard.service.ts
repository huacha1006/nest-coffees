import { Injectable } from '@nestjs/common';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { ApiException } from '../common/filters/http-exception/api.exception';
import { ApiErrorCode } from '../common/enums/api-error-code.enum';
@Injectable()
export class GuardService {
  create(createGuardDto: CreateGuardDto) {
    throw new ApiException('用户不存在', ApiErrorCode.USER_NOTEXIST);
    return 'This action adds a new guard';
  }

  findAll() {
    return `This action returns all guard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guard`;
  }

  update(id: number, updateGuardDto: UpdateGuardDto) {
    return `This action updates a #${id} guard`;
  }

  remove(id: number) {
    return `This action removes a #${id} guard`;
  }
}
