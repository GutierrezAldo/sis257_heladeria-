import { Module } from '@nestjs/common';
import { PresentacionesService } from './presentaciones.service';
import { PresentacionesController } from './presentaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presentacion } from './entities/presentacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Presentacion])],
  controllers: [PresentacionesController],
  providers: [PresentacionesService],
})
export class PresentacionesModule {}
