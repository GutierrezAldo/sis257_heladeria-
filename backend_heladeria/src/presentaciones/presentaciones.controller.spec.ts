import { Test, TestingModule } from '@nestjs/testing';
import { PresentacionesController } from './presentaciones.controller';
import { PresentacionesService } from './presentaciones.service';

describe('PresentacionesController', () => {
  let controller: PresentacionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PresentacionesController],
      providers: [PresentacionesService],
    }).compile();

    controller = module.get<PresentacionesController>(PresentacionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
