import { Test, TestingModule } from '@nestjs/testing';
import { CompraDetalleController } from './compra_detalle.controller';
import { CompraDetalleService } from './compra_detalle.service';

describe('CompraDetalleController', () => {
  let controller: CompraDetalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompraDetalleController],
      providers: [CompraDetalleService],
    }).compile();

    controller = module.get<CompraDetalleController>(CompraDetalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
