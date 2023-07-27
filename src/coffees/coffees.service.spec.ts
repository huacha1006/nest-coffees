import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { Event } from '../events/entities/event.entity/event.entity';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(Flavor), useValue: {} },
        { provide: getRepositoryToken(Coffee), useValue: {} },
        { provide: getRepositoryToken(Event), useValue: {} },
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
