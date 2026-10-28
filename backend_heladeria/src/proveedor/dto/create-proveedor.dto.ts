import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateProveedorDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El NIT es obligatorio' })
  @IsString({ message: 'El NIT debe ser de tipo cadena' })
  @MaxLength(20, { message: 'El NIT no puede tener más de 20 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly nit: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @IsString({ message: 'El teléfono debe ser de tipo cadena' })
  @MaxLength(20, { message: 'El teléfono no puede tener más de 20 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly telefono: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El tipo de producto es obligatorio' })
  @IsString({ message: 'El tipo de producto debe ser de tipo cadena' })
  @MaxLength(50, { message: 'El tipo de producto no puede tener más de 50 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly tipoProducto: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La dirección es obligatoria' })
  @IsString({ message: 'La dirección debe ser de tipo cadena' })
  @MaxLength(255, { message: 'La dirección no puede tener más de 255 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly direccion: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsString({ message: 'El email debe ser de tipo cadena' })
  @IsEmail({}, { message: 'El email debe ser un correo electrónico válido' })
  @MaxLength(100, { message: 'El email no puede tener más de 100 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly email: string;
}