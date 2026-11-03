import { Test, TestingModule } from '@nestjs/testing';
import { VentaDetalleController } from './venta_detalle.controller';
import { VentaDetalleService } from './venta_detalle.service';

describe('VentaDetalleController', () => {
  let controller: VentaDetalleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VentaDetalleController],
      providers: [VentaDetalleService],
    }).compile();

    controller = module.get<VentaDetalleController>(VentaDetalleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
