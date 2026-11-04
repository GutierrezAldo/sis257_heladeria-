import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDateString, IsDefined, IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreatePedidoDto {
  @ApiProperty()
  @IsDefined({ message: 'El id del cliente es obligatorio' })
  @IsInt({ message: 'El id del cliente debe ser de tipo numérico' })
  readonly idCliente: number;

  @ApiProperty()
  @IsDefined({ message: 'El id del empleado es obligatorio' })
  @IsInt({ message: 'El id del empleado debe ser de tipo numérico' })
  readonly idEmpleado: number;

  @ApiProperty()
  @IsDefined({ message: 'La fecha del pedido es obligatoria' })
  @IsDateString({}, { message: 'La fecha debe ser de un formato de fecha válido' })
  readonly fechaPedido: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'El tipo de pago es obligatorio' })
  @IsString({ message: 'El tipo de pago debe ser de tipo cadena' })
  @MaxLength(50, { message: 'El tipo de pago no puede tener más de 50 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly tipoPago: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsString({ message: 'El estado debe ser de tipo cadena' })
  @MaxLength(20, { message: 'El estado no puede tener más de 20 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly estado: string;

  @ApiProperty()
  @IsDefined({ message: 'El total del pedido es obligatorio' })
  @IsNumber({}, { message: 'El total del pedido debe ser un número' })
  readonly totalPedido: number;
}