import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompraDetalleDto } from './dto/create-compra_detalle.dto';
import { UpdateCompraDetalleDto } from './dto/update-compra_detalle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CompraDetalle } from './entities/compra_detalle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompraDetalleService {
  constructor(
    @InjectRepository(CompraDetalle)
    private compraDetalleRepository: Repository<CompraDetalle>,
  ) {}

  async create(createCompraDetalleDto: CreateCompraDetalleDto): Promise<CompraDetalle> {
    const detalle = new CompraDetalle();
    Object.assign(detalle, createCompraDetalleDto);
    return this.compraDetalleRepository.save(detalle);
  }

  async findAll(): Promise<CompraDetalle[]> {
    return this.compraDetalleRepository.find({
      relations: { compra: true, producto: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<CompraDetalle> {
    const detalle = await this.compraDetalleRepository.findOne({
      where: { id },
      relations: { compra: true, producto: true },
    });
    if (!detalle) throw new NotFoundException(`El detalle de compra con id ${id} no existe`);
    return detalle;
  }

  async update(id: number, updateCompraDetalleDto: UpdateCompraDetalleDto): Promise<CompraDetalle> {
    const detalle = await this.findOne(id);
    Object.assign(detalle, updateCompraDetalleDto);
    return this.compraDetalleRepository.save(detalle);
  }

  async remove(id: number): Promise<CompraDetalle> {
    const detalle = await this.findOne(id);
    return this.compraDetalleRepository.softRemove(detalle);
  }
}