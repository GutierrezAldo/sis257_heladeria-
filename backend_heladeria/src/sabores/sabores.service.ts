import { Injectable } from '@nestjs/common';
import { CreateSaboreDto } from './dto/create-sabore.dto';
import { UpdateSaboreDto } from './dto/update-sabore.dto';

@Injectable()
export class SaboresService {
  create(createSaboreDto: CreateSaboreDto) {
    return 'This action adds a new sabore';
  }

  findAll() {
    return `This action returns all sabores`;
  }

  findOne(id: number) {
    return `This action returns a #${id} sabore`;
  }

  update(id: number, updateSaboreDto: UpdateSaboreDto) {
    return `This action updates a #${id} sabore`;
  }

  remove(id: number) {
    return `This action removes a #${id} sabore`;
  }
}
