import { Test, TestingModule } from '@nestjs/testing';
import { CompraDetalleService } from './compra_detalle.service';

describe('CompraDetalleService', () => {
  let service: CompraDetalleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompraDetalleService],
    }).compile();

    service = module.get<CompraDetalleService>(CompraDetalleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
