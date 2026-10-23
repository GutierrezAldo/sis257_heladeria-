import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePresentacionDto } from './dto/create-presentacion.dto';
import { UpdatePresentacionDto } from './dto/update-presentacion.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Presentacion } from './entities/presentacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PresentacionesService {
  constructor(
    @InjectRepository(Presentacion) private presentacionesRepository: Repository<Presentacion>,
  ) {}

  async create(createPresentacionDto: CreatePresentacionDto): Promise<Presentacion> {
    let presentacion = await this.presentacionesRepository.findOneBy({
      nombre: createPresentacionDto.nombre,
    });
    if (presentacion) throw new ConflictException('La presentación ya existe');

    presentacion = new Presentacion();
    Object.assign(presentacion, createPresentacionDto);
    return this.presentacionesRepository.save(presentacion);
  }

  async findAll(): Promise<Presentacion[]> {
    return this.presentacionesRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<Presentacion> {
    const presentacion = await this.presentacionesRepository.findOneBy({ id });
    if (!presentacion) throw new NotFoundException('La presentación no existe');
    return presentacion;
  }

  async update(id: number, updatePresentacionDto: UpdatePresentacionDto): Promise<Presentacion> {
    const presentacion = await this.findOne(id);
    Object.assign(presentacion, updatePresentacionDto);
    return this.presentacionesRepository.save(presentacion);
  }

  async remove(id: number): Promise<Presentacion> {
    const presentacion = await this.findOne(id);
    return this.presentacionesRepository.softRemove(presentacion);
  }
}