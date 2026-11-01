import { PartialType } from '@nestjs/swagger';
import { CreateCompraDetalleDto } from './create-compra_detalle.dto';

export class UpdateCompraDetalleDto extends PartialType(CreateCompraDetalleDto) {}
