import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePresentacionDto {
  @ApiProperty({
    description: 'Nombre de la presentación',
    example: 'Cono pequeño',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'El campo nombre no debe ser mayor a 100 caracteres',
  })
  readonly nombre: string;

  @ApiProperty({
    description: 'Precio en moneda local (hasta 2 decimales), valor mínimo 0',
    example: 15.5,
    minimum: 0,
    type: Number,
    format: 'float',
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio: number;
}
