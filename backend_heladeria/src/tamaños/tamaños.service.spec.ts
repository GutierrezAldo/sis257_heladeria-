import { Test, TestingModule } from '@nestjs/testing';
import { TamañosService } from './tamaños.service';

describe('TamañosService', () => {
  let service: TamañosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TamañosService],
    }).compile();

    service = module.get<TamañosService>(TamañosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
