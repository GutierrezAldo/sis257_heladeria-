import { Test, TestingModule } from '@nestjs/testing';
import { TamanosController } from './tamanos.controller';
import { TamanosService } from './tamanos.service';

describe('TamanosController', () => {
  let controller: TamanosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TamanosController],
      providers: [TamanosService],
    }).compile();

    controller = module.get<TamanosController>(TamanosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
