import { Injectable } from '@nestjs/common';
import { CreateSaboreDto } from './dto/create-sabore.dto';
import { UpdateSaboreDto } from './dto/update-sabore.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sabore } from './entities/sabore.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaboresService {
  async create(createSaboreDto: CreateSaboreDto){
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
