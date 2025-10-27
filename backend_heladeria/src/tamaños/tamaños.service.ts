import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTamañoDto } from './dto/create-tamaño.dto';
import { UpdateTamañoDto } from './dto/update-tamaño.dto';
import { Tamaño } from './entities/tamaño.entity';

@Injectable()
export class TamañosService {
  constructor(
    @InjectRepository(Tamaño)
    private tamañosRepository: Repository<Tamaño>,
  ) {}

  async create(createTamañoDto: CreateTamañoDto) {
    const existing = await this.tamañosRepository.findOneBy({
      nombre: createTamañoDto.nombre.trim(),
    });
    if (existing) {
      throw new ConflictException('El tamaño con ese nombre ya existe');
    }

    const tamaño = this.tamañosRepository.create({
      nombre: createTamañoDto.nombre.trim(),
      cantidadBolas: createTamañoDto.cantidadBolas,
      precio: createTamañoDto.precio,
    });

    return this.tamañosRepository.save(tamaño);
  }

  findAll() {
    return this.tamañosRepository.find();
  }

  async findOne(id: number) {
    const tamaño = await this.tamañosRepository.findOneBy({ id });
    if (!tamaño) {
      throw new NotFoundException(`Tamaño con ID ${id} no encontrado`);
    }
    return tamaño;
  }

  async update(id: number, updateTamañoDto: UpdateTamañoDto) {
    const tamaño = await this.findOne(id);

    if (updateTamañoDto.nombre) {
      const existing = await this.tamañosRepository.findOneBy({
        nombre: updateTamañoDto.nombre.trim(),
      });
      if (existing && existing.id !== id) {
        throw new ConflictException('El tamaño con ese nombre ya existe');
      }
    }

    const tallaUpdate = Object.assign(tamaño, {
      ...updateTamañoDto,
      nombre: updateTamañoDto.nombre?.trim(),
    });

    const updated = await this.tamañosRepository.save(tallaUpdate);
    return {
      message: 'El tamaño ha sido actualizado exitosamente',
      tamaño: updated,
    };
  }

  async remove(id: number) {
    const tamaño = await this.findOne(id);
    await this.tamañosRepository.softRemove(tamaño);
    return { message: 'El tamaño ha sido eliminado exitosamente', tamaño };
  }
}
