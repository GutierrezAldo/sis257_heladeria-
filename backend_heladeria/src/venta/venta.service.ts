import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VentaService {
  constructor(@InjectRepository(Venta) private readonly ventaRepository: Repository<Venta>) {}

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    const venta = new Venta();
    Object.assign(venta, createVentaDto);
    return this.ventaRepository.save(venta);
  }

  async findAll(): Promise<Venta[]> {
    return this.ventaRepository.find({
      relations: { usuario: true, cliente: true },
      order: { fecha: 'DESC', id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: { usuario: true, cliente: true },
    });
    if (!venta) throw new NotFoundException(`La venta con id ${id} no existe`);
    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.findOne(id);
    Object.assign(venta, updateVentaDto);
    return this.ventaRepository.save(venta);
  }

  async remove(id: number): Promise<Venta> {
    const venta = await this.findOne(id);
    return this.ventaRepository.softRemove(venta);
  }
}