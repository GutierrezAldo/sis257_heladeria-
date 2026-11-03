import { Module } from '@nestjs/common';
import { VentaDetalleService } from './venta_detalle.service';
import { VentaDetalleController } from './venta_detalle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentaDetalle } from './entities/venta_detalle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VentaDetalle])],
  controllers: [VentaDetalleController],
  providers: [VentaDetalleService],
})
export class VentaDetalleModule {}