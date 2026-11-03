import { PartialType } from '@nestjs/swagger';
import { CreateVentaDetalleDto } from './create-venta_detalle.dto';

export class UpdateVentaDetalleDto extends PartialType(CreateVentaDetalleDto) {}
