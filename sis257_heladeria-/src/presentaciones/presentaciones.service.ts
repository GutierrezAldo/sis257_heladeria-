import { Injectable } from '@nestjs/common';
import { CreatePresentacioneDto } from './dto/create-presentacione.dto';
import { UpdatePresentacioneDto } from './dto/update-presentacione.dto';

@Injectable()
export class PresentacionesService {
  create(createPresentacioneDto: CreatePresentacioneDto) {
    return 'This action adds a new presentacione';
  }

  findAll() {
    return `This action returns all presentaciones`;
  }

  findOne(id: number) {
    return `This action returns a #${id} presentacione`;
  }

  update(id: number, updatePresentacioneDto: UpdatePresentacioneDto) {
    return `This action updates a #${id} presentacione`;
  }

  remove(id: number) {
    return `This action removes a #${id} presentacione`;
  }
}
