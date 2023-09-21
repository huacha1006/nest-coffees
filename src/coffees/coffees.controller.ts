import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Patch,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  Ip,
  Headers,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
import { Public } from '../common/decorators/public.decorator';
import { WrapResponseInterceptor } from '../common/interceptors/wrap-response/wrap-response.interceptor';
import { ParseIntPipe } from '../common/pipes/parse-int/parse-int.pipe';
import { Protocol } from '../common/decorators/protocol.decorator';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@UsePipes(ValidationPipe)
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) {}

  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Public()
  @UseInterceptors(WrapResponseInterceptor)
  @Get()
  findAll(
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
    @Ip() ip: string,
    @Headers() header: any,
  ) {
    const { limit, offset } = paginationQuery;
    console.log(`ip是${ip}`, header);
    return this.coffeesService.findAll(paginationQuery);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.coffeesService.findOne(id);
  }

  // @Public()
  // @Get(':id')
  // async findTimeoutOne(@Param('id') id: string) {
  //   await new Promise((resolve) => setTimeout(resolve, 5000));
  //   return this.coffeesService.findOne(id);
  // }

  @Post()
  create(@Body() CreateCoffeeDto: CreateCoffeeDto) {
    return this.coffeesService.create(CreateCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() UpdateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, UpdateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
