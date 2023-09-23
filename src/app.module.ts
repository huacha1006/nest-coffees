import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './config/app.config';
import { APP_PIPE } from '@nestjs/core';
import { CommonModule } from './common/common.module';
import { UserModule } from './user/user.module';
import { ConfigModule as ConfigM } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { SpiderModule } from './spider/spider.module';
import { GuardModule } from './guard/guard.module';
import { AuthModule } from './auth/auth.module';
import { PermissionModule } from './permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        autoLoadEntities: true,
        synchronize: true,
        charset: 'utf8',
      }),
    }),
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    CoffeesModule,
    CoffeeRatingModule,
    CommonModule,
    UserModule,
    ConfigM.forRoot({ path: '/hello' }),
    UploadModule,
    SpiderModule,
    GuardModule,
    AuthModule,
    PermissionModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide:APP_PIPE,
    //   useClass:ValidationPipe
    // }
  ],
})
export class AppModule {}
