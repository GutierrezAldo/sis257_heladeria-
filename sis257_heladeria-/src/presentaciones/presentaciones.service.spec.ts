import { Test, TestingModule } from '@nestjs/testing';
import { PresentacionesService } from './presentaciones.service';

describe('PresentacionesService', () => {
  let service: PresentacionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PresentacionesService],
    }).compile();

    service = module.get<PresentacionesService>(PresentacionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
