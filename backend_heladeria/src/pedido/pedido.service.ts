import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PedidoService {
  constructor(@InjectRepository(Pedido) private readonly pedidoRepository: Repository<Pedido>) {}

  async create(createPedidoDto: CreatePedidoDto): Promise<Pedido> {
    const pedido = new Pedido();
    Object.assign(pedido, createPedidoDto);
    return this.pedidoRepository.save(pedido);
  }

  async findAll(): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      relations: { cliente: true, empleado: true },
      order: { fechaPedido: 'DESC', id: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
      relations: { cliente: true, empleado: true },
    });
    if (!pedido) throw new NotFoundException(`El pedido con id ${id} no existe`);
    return pedido;
  }

  async update(id: number, updatePedidoDto: UpdatePedidoDto): Promise<Pedido> {
    const pedido = await this.findOne(id);
    Object.assign(pedido, updatePedidoDto);
    return this.pedidoRepository.save(pedido);
  }

  async remove(id: number): Promise<Pedido> {
    const pedido = await this.findOne(id);
    return this.pedidoRepository.softRemove(pedido);
  }
}