import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumber,
  Min,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSaborDto {
  @ApiProperty({
    description: 'Nombre del sabor',
    example: 'Vainilla',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(100, {
    message: 'El campo nombre no debe ser mayor a 100 caracteres',
  })
  readonly nombre: string;

  @ApiProperty({
    description: 'Descripción del sabor',
    example: 'Sabor clásico, cremoso',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MaxLength(250, {
    message: 'El campo descripción no debe ser mayor a 250 caracteres',
  })
  readonly descripcion?: string;

  @ApiProperty({
    description: 'Precio asociado al sabor',
    example: 12.5,
    minimum: 0,
    type: Number,
    format: 'float',
  })
  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio: number;
}
