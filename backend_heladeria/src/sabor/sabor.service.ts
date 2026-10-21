import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaborDto } from './dto/create-sabor.dto';
import { UpdateSaborDto } from './dto/update-sabor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sabor } from './entities/sabor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaborService {
  constructor(@InjectRepository(Sabor) private saboresRepository: Repository<Sabor>) {}

  async create(createSaborDto: CreateSaborDto): Promise<Sabor> {
    let sabor = await this.saboresRepository.findOneBy({
      nombre: createSaborDto.nombre,
    });
    if (sabor) throw new ConflictException('El sabor ya existe');

    sabor = new Sabor();
    Object.assign(sabor, createSaborDto);
    return this.saboresRepository.save(sabor);
  }

  async findAll(): Promise<Sabor[]> {
    return this.saboresRepository.find({ order: { nombre: 'ASC' } });
  }

  async findOne(id: number): Promise<Sabor> {
    const sabor = await this.saboresRepository.findOneBy({ id });
    if (!sabor) throw new NotFoundException('El sabor no existe');
    return sabor;
  }

  async update(id: number, updateSaborDto: UpdateSaborDto): Promise<Sabor> {
    const sabor = await this.findOne(id);
    Object.assign(sabor, updateSaborDto);
    return this.saboresRepository.save(sabor);
  }

  async remove(id: number): Promise<Sabor> {
    const sabor = await this.findOne(id);
    return this.saboresRepository.softRemove(sabor);
  }
}