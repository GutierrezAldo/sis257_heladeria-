import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsDefined, IsInt, IsNumber } from 'class-validator';

export class CreateCompraDto {
  @ApiProperty()
  @IsDefined({ message: 'El id del proveedor es obligatorio' })
  @IsInt({ message: 'El id del proveedor debe ser de tipo numérico' })
  readonly idProveedor: number;

  @ApiProperty()
  @IsDefined({ message: 'El id del usuario es obligatorio' })
  @IsInt({ message: 'El id del usuario debe ser de tipo numérico' })
  readonly idUsuario: number;

  @ApiProperty()
  @IsDefined({ message: 'La fecha de compra es obligatoria' })
  @IsDateString({}, { message: 'La fecha de compra debe ser de un formato de fecha válido' })
  readonly fecha: Date;

  @ApiProperty()
  @IsDefined({ message: 'El total de la compra es obligatorio' })
  @IsNumber({}, { message: 'El total de la compra debe ser un número' })
  readonly totalCompra: number;
}