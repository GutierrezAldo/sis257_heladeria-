import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompraDto } from './dto/create-compra.dto';
import { UpdateCompraDto } from './dto/update-compra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Compra } from './entities/compra.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompraService {
  constructor(@InjectRepository(Compra) private readonly compraRepository: Repository<Compra>) {}

  async create(createCompraDto: CreateCompraDto): Promise<Compra> {
    const compra = new Compra();
    Object.assign(compra, createCompraDto);
    return this.compraRepository.save(compra);
  }

  async findAll(): Promise<Compra[]> {
    return this.compraRepository.find({
      relations: { proveedor: true, usuario: true },
      order: { fecha: 'DESC', id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Compra> {
    const compra = await this.compraRepository.findOne({
      where: { id },
      relations: { proveedor: true, usuario: true },
    });
    if (!compra) throw new NotFoundException('La compra no existe');
    return compra;
  }

  async update(id: number, updateCompraDto: UpdateCompraDto): Promise<Compra> {
    const compra = await this.findOne(id);
    Object.assign(compra, updateCompraDto);
    return this.compraRepository.save(compra);
  }

  async remove(id: number): Promise<Compra> {
    const compra = await this.findOne(id);
    return this.compraRepository.softRemove(compra);
  }
}