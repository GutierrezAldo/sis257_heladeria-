import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateClienteDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El CI es obligatorio' })
  @IsString({ message: 'El CI debe ser de tipo cadena' })
  @MaxLength(20, { message: 'El CI no puede tener más de 20 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly ci: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La razón social es obligatoria' })
  @IsString({ message: 'La razón social debe ser de tipo cadena' })
  @MaxLength(150, { message: 'La razón social no puede tener más de 150 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly razonSocial: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El teléfono es obligatorio' })
  @IsString({ message: 'El teléfono debe ser de tipo cadena' })
  @MaxLength(20, { message: 'El teléfono no puede tener más de 20 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly telefono: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El email es obligatorio' })
  @IsString({ message: 'El email debe ser de tipo cadena' })
  @IsEmail({}, { message: 'El email debe ser un correo electrónico válido' })
  @MaxLength(100, { message: 'El email no puede tener más de 100 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly email: string;
}