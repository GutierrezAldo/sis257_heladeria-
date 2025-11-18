import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsArray,
  ValidateNested,
  Min,
  Max,
  IsEnum,
  IsOptional,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class DetalleVentaDto {
  @ApiProperty({ description: 'ID del sabor', example: 1 })
  @IsNotEmpty({ message: 'El ID del sabor es requerido' })
  @IsNumber({}, { message: 'El ID del sabor debe ser un número' })
  idSabor: number;

  @ApiProperty({ description: 'ID de la presentación', example: 2 })
  @IsNotEmpty({ message: 'El ID de la presentación es requerido' })
  @IsNumber({}, { message: 'El ID de la presentación debe ser un número' })
  idPresentacion: number;

  @ApiProperty({ description: 'ID del tamaño', example: 3 })
  @IsNotEmpty({ message: 'El ID del tamaño es requerido' })
  @IsNumber({}, { message: 'El ID del tamaño debe ser un número' })
  idTamaño: number;

  @ApiProperty({ description: 'Cantidad del producto', example: 2 })
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'La cantidad debe ser un número entero válido' },
  )
  @Min(1, { message: 'La cantidad debe ser al menos 1' })
  @Max(1000000, { message: 'Cantidad demasiado grande' })
  cantidad: number;
}

export class CreateVentaDto {
  @ApiProperty({
    description: 'ID del usuario que realiza la venta',
    example: 1,
  })
  @IsNumber({}, { message: 'El ID del usuario debe ser un número' })
  @IsNotEmpty({ message: 'El ID del usuario es requerido' })
  idUsuario: number;

  @ApiProperty({
    description: 'Método de pago utilizado',
    example: 'efectivo',
    enum: ['efectivo', 'tarjeta', 'transferencia', 'cotización', 'otro'],
    default: 'efectivo',
  })
  @IsString({ message: 'El método de pago debe ser una cadena de texto' })
  @IsEnum(['efectivo', 'tarjeta', 'transferencia', 'cotización', 'otro'], {
    message:
      'Método de pago inválido. Debe ser: efectivo, tarjeta, transferencia, cotización o otro',
  })
  metodoPago: string;

  @ApiProperty({
    description: 'Nombre del cliente (opcional)',
    example: 'Juan Pérez',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El nombre del cliente debe ser una cadena de texto' })
  @MaxLength(150, {
    message: 'El nombre del cliente no debe exceder 150 caracteres',
  })
  nombreCliente?: string;

  @ApiProperty({
    description: 'Documento de identidad del cliente (opcional)',
    example: '12345678',
    required: false,
  })
  @IsOptional()
  @IsString({ message: 'El documento debe ser una cadena de texto' })
  @MaxLength(20, {
    message: 'El documento no debe exceder 20 caracteres',
  })
  documento?: string;

  @ApiProperty({
    description: 'Detalles de los productos vendidos',
    type: [DetalleVentaDto],
  })
  @IsArray({ message: 'Los detalles deben ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => DetalleVentaDto)
  detalles: DetalleVentaDto[];

  @ApiProperty({
    description: 'Monto pagado por el cliente',
    example: 100.0,
    type: Number,
    default: 0,
  })
  @IsNumber({}, { message: 'El monto pagado debe ser un número' })
  @Min(0, { message: 'El monto pagado no puede ser negativo' })
  montoPagado: number;

  @ApiProperty({
    description: 'Cambio entregado al cliente',
    example: 5.0,
    type: Number,
    default: 0,
  })
  @IsNumber({}, { message: 'El cambio debe ser un número' })
  @Min(0, { message: 'El cambio no puede ser negativo' })
  cambio: number;
}
