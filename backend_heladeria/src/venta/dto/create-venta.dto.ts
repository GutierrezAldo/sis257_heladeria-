import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsDefined, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateVentaDto {
  @ApiProperty()
  @IsDefined({ message: 'El id del usuario es obligatorio' })
  @IsInt({ message: 'El id del usuario debe ser de tipo numérico' })
  readonly idUsuario: number;

  @ApiProperty()
  @IsDefined({ message: 'El id del cliente es obligatorio' })
  @IsInt({ message: 'El id del cliente debe ser de tipo numérico' })
  readonly idCliente: number;

  @ApiProperty()
  @IsDefined({ message: 'La fecha de la venta es obligatoria' })
  @IsDateString({}, { message: 'La fecha debe ser de un formato de fecha válido' })
  readonly fecha: Date;

  @ApiProperty()
  @IsDefined({ message: 'El total de la venta es obligatorio' })
  @IsNumber({}, { message: 'El total de la venta debe ser un número' })
  readonly totalVenta: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsString({ message: 'El estado debe ser de tipo cadena' })
  @MaxLength(20, { message: 'El estado no puede tener más de 20 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly estado: string;
}