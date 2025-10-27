import { PartialType } from '@nestjs/swagger';
import { CreateTamañoDto } from './create-tamaño.dto';

export class UpdateTamañoDto extends PartialType(CreateTamañoDto) {}
