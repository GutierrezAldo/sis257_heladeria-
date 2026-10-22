import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTamanoDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El ID del producto es obligatorio' })
  @IsInt({ message: 'El ID del producto debe ser un número entero' })
  readonly idProducto: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre del tamaño es obligatorio' })
  @IsString({ message: 'El nombre del tamaño debe ser de tipo cadena' })
  @MaxLength(50, { message: 'El nombre del tamaño no puede tener más de 50 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly nombre: string;
}
