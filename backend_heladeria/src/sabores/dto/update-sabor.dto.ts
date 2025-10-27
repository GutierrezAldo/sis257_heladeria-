import { PartialType } from '@nestjs/swagger';
import { CreateSaborDto } from './create-sabor.dto';

export class UpdateSaborDto extends PartialType(CreateSaborDto) {}
