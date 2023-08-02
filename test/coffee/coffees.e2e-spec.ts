import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { CoffeesModule } from '../../src/coffees/Coffees.Module';

describe('[Feature] Coffees - /coffees', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoffeesModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  //   it('/ (GET)', () => {
  //     return request(app.getHttpServer())
  //       .get('/')
  //       .set('Authorization', process.env.API_KEY)
  //       .expect(200)
  //       .expect('Hello World!');
  //   });

  afterAll(async () => {
    await app.close();
  });
});
