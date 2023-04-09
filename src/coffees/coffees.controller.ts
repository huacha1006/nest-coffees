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
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Res() response) {
    response.status(200).send('This action returns all coffees');
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns ${id} coffees`;
  }

  @Post()
  @HttpCode(HttpStatus.GATEWAY_TIMEOUT)
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action update ${id} coffee`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action remove ${id} coffee`;
  }
}
