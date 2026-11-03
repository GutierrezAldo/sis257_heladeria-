import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsInt, IsNumber } from 'class-validator';

export class CreateVentaDetalleDto {
  @ApiProperty()
  @IsDefined({ message: 'El id de la venta es obligatorio' })
  @IsInt({ message: 'El id de la venta debe ser un número entero' })
  readonly idVenta: number;

  @ApiProperty()
  @IsDefined({ message: 'El id del producto es obligatorio' })
  @IsInt({ message: 'El id del producto debe ser un número entero' })
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
  @IsDefined({ message: 'El total es obligatorio' })
  @IsNumber({}, { message: 'El total debe ser un número' })
  readonly total: number;
}