import { Module } from '@nestjs/common';
import { CompraDetalleService } from './compra_detalle.service';
import { CompraDetalleController } from './compra_detalle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompraDetalle } from './entities/compra_detalle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompraDetalle])],
  controllers: [CompraDetalleController],
  providers: [CompraDetalleService],
})
export class CompraDetalleModule {}