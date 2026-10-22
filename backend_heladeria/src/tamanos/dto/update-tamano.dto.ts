import { PartialType } from '@nestjs/swagger';
import { CreateTamanoDto } from './create-tamano.dto';

export class UpdateTamanoDto extends PartialType(CreateTamanoDto) {}
