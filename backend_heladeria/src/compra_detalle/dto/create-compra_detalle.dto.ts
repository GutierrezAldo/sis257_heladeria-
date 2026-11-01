import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsNumber } from 'class-validator';

export class CreateCompraDetalleDto {
  @ApiProperty()
  @IsDefined({ message: 'El id de la compra es obligatorio' })
  @IsInt({ message: 'El id de la compra debe ser de tipo numérico' })
  readonly idCompra: number;

  @ApiProperty()
  @IsDefined({ message: 'El id del producto es obligatorio' })
  @IsInt({ message: 'El id del producto debe ser de tipo numérico' })
  readonly idProducto: number;

  @ApiProperty()
  @IsDefined({ message: 'La cantidad es obligatoria' })
  @IsInt({ message: 'La cantidad debe ser un número entero' })
  readonly cantidad: number;

  @ApiProperty()
  @IsDefined({ message: 'El precio unitario es obligatorio' })
  @IsNumber({}, { message: 'El precio unitario debe ser un número' })
  readonly precioUnitario: number;

  @ApiProperty()
  @IsDefined({ message: 'El subtotal es obligatorio' })
  @IsNumber({}, { message: 'El subtotal debe ser un número' })
  readonly subtotal: number;
}