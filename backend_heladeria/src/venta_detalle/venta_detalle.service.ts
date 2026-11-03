import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVentaDetalleDto } from './dto/create-venta_detalle.dto';
import { UpdateVentaDetalleDto } from './dto/update-venta_detalle.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { VentaDetalle } from './entities/venta_detalle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VentaDetalleService {
  constructor(
    @InjectRepository(VentaDetalle)
    private ventaDetalleRepository: Repository<VentaDetalle>,
  ) {}

  async create(createVentaDetalleDto: CreateVentaDetalleDto): Promise<VentaDetalle> {
    const detalle = new VentaDetalle();
    Object.assign(detalle, createVentaDetalleDto);
    return this.ventaDetalleRepository.save(detalle);
  }

  async findAll(): Promise<VentaDetalle[]> {
    return this.ventaDetalleRepository.find({
      relations: { venta: true, producto: true },
      order: { id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<VentaDetalle> {
    const detalle = await this.ventaDetalleRepository.findOne({
      where: { id },
      relations: { venta: true, producto: true },
    });
    if (!detalle) throw new NotFoundException(`El detalle de venta con id ${id} no existe`);
    return detalle;
  }

  async update(id: number, updateVentaDetalleDto: UpdateVentaDetalleDto): Promise<VentaDetalle> {
    const detalle = await this.findOne(id);
    Object.assign(detalle, updateVentaDetalleDto);
    return this.ventaDetalleRepository.save(detalle);
  }

  async remove(id: number): Promise<VentaDetalle> {
    const detalle = await this.findOne(id);
    return this.ventaDetalleRepository.softRemove(detalle);
  }
}