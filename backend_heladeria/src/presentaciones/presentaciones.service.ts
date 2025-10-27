import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePresentacionDto } from './dto/create-presentacion.dto';
import { UpdatePresentacionDto } from './dto/update-presentacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Presentacion } from './entities/presentacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PresentacionesService {
  constructor(
    @InjectRepository(Presentacion)
    private presentacionesRepository: Repository<Presentacion>,
  ) {}

  async create(createPresentacionDto: CreatePresentacionDto) {
    const existingPresentacion = await this.presentacionesRepository.findOneBy({
      nombre: createPresentacionDto.nombre.trim(),
    });
    if (existingPresentacion) {
      throw new ConflictException(
        `La presentacion con el nombre proporcionado ya existe`,
      );
    }

    const presentacion = this.presentacionesRepository.create({
      nombre: createPresentacionDto.nombre.trim(),
      precio: createPresentacionDto.precio,
    });

    return this.presentacionesRepository.save(presentacion);
  }

  findAll() {
    return this.presentacionesRepository.find();
  }

  async findOne(id: number) {
    const presentacion = await this.presentacionesRepository.findOneBy({ id });
    if (!presentacion) {
      throw new NotFoundException(`Presentacion with ID ${id} not found`);
    }
    return presentacion;
  }

  async update(
    id: number,
    updatePresentacionDto: UpdatePresentacionDto,
  ): Promise<{ message: string; presentacion: Presentacion }> {
    const presentacion = await this.findOne(id);

    if (updatePresentacionDto.nombre) {
      const existingPresentacion =
        await this.presentacionesRepository.findOneBy({
          nombre: updatePresentacionDto.nombre.trim(),
        });

      if (existingPresentacion && existingPresentacion.id !== id) {
        throw new ConflictException(
          `La presentacion con el nombre proporcionado ya existe`,
        );
      }
    }

    const presentacionUpdate = Object.assign(presentacion, {
      ...updatePresentacionDto,
      nombre: updatePresentacionDto.nombre?.trim(),
    });

    const updatedPresentacion =
      await this.presentacionesRepository.save(presentacionUpdate);

    return {
      message: 'La presentacion ha sido actualizada exitosamente',
      presentacion: updatedPresentacion,
    };
  }

  async remove(
    id: number,
  ): Promise<{ message: string; presentacion?: Presentacion }> {
    const presentacion = await this.findOne(id);

    await this.presentacionesRepository.softRemove(presentacion);
    return {
      message: 'La presentación ha sido eliminada exitosamente',
      presentacion,
    };
  }
}
