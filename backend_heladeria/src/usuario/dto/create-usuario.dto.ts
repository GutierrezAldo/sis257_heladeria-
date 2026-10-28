import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'El ID del empleado es obligatorio' })
  @IsInt({ message: 'El ID del empleado debe ser un número entero' })
  readonly idEmpleado: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El ID del rol es obligatorio' })
  @IsInt({ message: 'El ID del rol debe ser un número entero' })
  readonly idRol: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'El nombre de usuario es obligatorio' })
  @IsString({ message: 'El nombre de usuario debe ser de tipo cadena' })
  @MaxLength(50, { message: 'El nombre de usuario no puede tener más de 50 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly usuario: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'La clave es obligatoria' })
  @IsString({ message: 'La clave debe ser de tipo cadena' })
  @MaxLength(250, { message: 'La clave no puede tener más de 250 caracteres' })
  readonly clave: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'El estado es obligatorio' })
  @IsString({ message: 'El estado debe ser de tipo cadena' })
  @MaxLength(20, { message: 'El estado no puede tener más de 20 caracteres' })
  @Transform(({ value }): string | undefined => (typeof value === 'string' ? value.trim() : value))
  readonly estado: string;
}