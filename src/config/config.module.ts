import { Global, Module, DynamicModule } from '@nestjs/common';
type Options = { path: string };

@Global()
@Module({
  //   providers: [
  //     {
  //       provide: 'Config',
  //       useValue: { baseUrl: '/api' },
  //     },
  //   ],
  //   exports: [
  //     {
  //       provide: 'Config',
  //       useValue: { baseUrl: '/api' },
  //     },
  //   ],
})
export class ConfigModule {
  static forRoot(options: Options): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: { baseUrl: '/api' + options.path },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: { baseUrl: '/api' + options.path },
        },
      ],
    };
  }
}
