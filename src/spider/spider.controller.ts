import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpiderService } from './spider.service';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
import axios from 'axios';
import { Public } from 'src/common/decorators/public.decorator';
import * as cheerio from 'cheerio';

@Controller('spider')
export class SpiderController {
  constructor(private readonly spiderService: SpiderService) {}

  @Public()
  @Get()
  async findAll() {
    console.log('jinlail');
    const body = await axios.get('https://uniapp.dcloud.net.cn');
    const $ = cheerio.load(body.data);
    const page = $('.flex-img-group-view a .barcode-img-box img').each(
      function () {
        console.log($(this).attr('src'));
      },
    );
    return true;
  }
}
