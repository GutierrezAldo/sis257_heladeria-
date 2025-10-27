import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumber,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTamañoDto {
  @ApiProperty({
    description: 'Nombre del tamaño',
    example: 'Chico',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'El campo nombre no debe ser mayor a 100 caracteres',
  })
  readonly nombre: string;

  @ApiProperty({
    description: 'Cantidad de bolas (texto libre)',
    example: '2',
  })
  @IsString()
  @MaxLength(50)
  readonly cantidadBolas: string;

  @ApiProperty({
    description: 'Precio del tamaño',
    example: 20.0,
    minimum: 0,
    type: Number,
    format: 'float',
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  readonly precio: number;
}
