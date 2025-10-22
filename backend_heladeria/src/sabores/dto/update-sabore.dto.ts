import { PartialType } from '@nestjs/mapped-types';
import { CreateSaboreDto } from './create-sabore.dto';

export class UpdateSaboreDto extends PartialType(CreateSaboreDto) {}
