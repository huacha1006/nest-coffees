import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'Test',
      useValue: ['JD', 'TB'],
    },
    {
      provide: 'CCC',
      useFactory() {
        if (true) {
          return;
        } else {
          return;
        }
      },
    },
  ],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
