import { Test, TestingModule } from '@nestjs/testing';
import { TamañosController } from './tamaños.controller';
import { TamañosService } from './tamaños.service';

describe('TamañosController', () => {
  let controller: TamañosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TamañosController],
      providers: [TamañosService],
    }).compile();

    controller = module.get<TamañosController>(TamañosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
