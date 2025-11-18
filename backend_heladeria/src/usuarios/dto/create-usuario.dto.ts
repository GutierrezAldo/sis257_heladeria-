import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUsuarioDto {
  @ApiProperty({
    example: 'juanperez',
    description: 'Nombre de usuario único',
  })
  @IsNotEmpty({ message: 'El campo usuario no debe ser vacío' })
  @IsString({ message: 'El campo usuario debe ser de tipo cadena' })
  @MaxLength(20, {
    message: 'El campo usuario no debe ser mayor a 50 caracteres',
  })
  usuario: string;

  @ApiProperty({
    example: 'juanperez@email.com',
    description: 'Correo electrónico del usuario',
  })
  @IsNotEmpty({ message: 'El campo email no debe ser vacío' })
  @IsString({ message: 'El campo email debe ser de tipo cadena' })
  @MaxLength(70, {
    message: 'El campo email no debe ser mayor a 50 caracteres',
  })
  email: string;

  @ApiProperty({
    example: 'miClaveSegura123',
    description: 'Contraseña del usuario',
  })
  @IsNotEmpty({ message: 'El campo clave no debe ser vacío' })
  @IsString({ message: 'El campo clave debe ser de tipo cadena' })
  @MaxLength(100, {
    message: 'El campo clave no debe ser mayor a 100 caracteres',
  })
  clave: string;
}
