import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTamanoDto } from './dto/create-tamano.dto';
import { UpdateTamanoDto } from './dto/update-tamano.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tamano } from './entities/tamano.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TamanosService {
  constructor(@InjectRepository(Tamano) private tamanosRepository: Repository<Tamano>) {}

  async create(createTamanoDto: CreateTamanoDto): Promise<Tamano> {
    let tamano = await this.tamanosRepository.findOneBy({
      nombre: createTamanoDto.nombre,
    });
    if (tamano) throw new ConflictException('El tamaño ya existe');

    tamano = new Tamano();
    Object.assign(tamano, createTamanoDto);
    return this.tamanosRepository.save(tamano);
  }

  async findAll(): Promise<Tamano[]> {
    return this.tamanosRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<Tamano> {
    const tamano = await this.tamanosRepository.findOneBy({ id });
    if (!tamano) throw new NotFoundException('El tamaño no existe');
    return tamano;
  }

  async update(id: number, updateTamanoDto: UpdateTamanoDto): Promise<Tamano> {
    const tamano = await this.findOne(id);
    Object.assign(tamano, updateTamanoDto);
    return this.tamanosRepository.save(tamano);
  }

  async remove(id: number): Promise<Tamano> {
    const tamano = await this.findOne(id);
    return this.tamanosRepository.softRemove(tamano);
  }
}