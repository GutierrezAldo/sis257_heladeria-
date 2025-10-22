import { Module } from '@nestjs/common';
import { PresentacionesService } from './presentaciones.service';
import { PresentacionesController } from './presentaciones.controller';

@Module({
  controllers: [PresentacionesController],
  providers: [PresentacionesService],
})
export class PresentacionesModule {}
