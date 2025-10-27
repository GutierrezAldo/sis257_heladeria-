import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSaborDto } from './dto/create-sabor.dto';
import { UpdateSaborDto } from './dto/update-sabor.dto';
import { Sabor } from './entities/sabor.entity';

@Injectable()
export class SaboresService {
  constructor(
    @InjectRepository(Sabor)
    private saboresRepository: Repository<Sabor>,
  ) {}

  async create(createSaborDto: CreateSaborDto) {
    const existing = await this.saboresRepository.findOneBy({
      nombre: createSaborDto.nombre.trim(),
    });
    if (existing) {
      throw new ConflictException('El sabor con ese nombre ya existe');
    }

    const sabor = this.saboresRepository.create({
      nombre: createSaborDto.nombre.trim(),
      descripcion: createSaborDto.descripcion,
      precio: createSaborDto.precio,
    });

    return this.saboresRepository.save(sabor);
  }

  findAll() {
    return this.saboresRepository.find();
  }

  async findOne(id: number) {
    const sabor = await this.saboresRepository.findOneBy({ id });
    if (!sabor) {
      throw new NotFoundException(`Sabor con ID ${id} no encontrado`);
    }
    return sabor;
  }

  async update(id: number, updateSaborDto: UpdateSaborDto) {
    const sabor = await this.findOne(id);

    if (updateSaborDto.nombre) {
      const existing = await this.saboresRepository.findOneBy({
        nombre: updateSaborDto.nombre.trim(),
      });
      if (existing && existing.id !== id) {
        throw new ConflictException('El sabor con ese nombre ya existe');
      }
    }

    const saborUpdate = Object.assign(sabor, {
      ...updateSaborDto,
      nombre: updateSaborDto.nombre?.trim(),
    });

    const updated = await this.saboresRepository.save(saborUpdate);
    return {
      message: 'El sabor ha sido actualizado exitosamente',
      sabor: updated,
    };
  }

  async remove(id: number) {
    const sabor = await this.findOne(id);
    await this.saboresRepository.softRemove(sabor);
    return { message: 'El sabor ha sido eliminado exitosamente', sabor };
  }
}
