import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { VentaDetalleService } from './venta_detalle.service';
import { CreateVentaDetalleDto } from './dto/create-venta_detalle.dto';
import { UpdateVentaDetalleDto } from './dto/update-venta_detalle.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('venta-detalles')
export class VentaDetalleController {
  constructor(private readonly ventaDetalleService: VentaDetalleService) {}

  @Post()
  create(@Body() createVentaDetalleDto: CreateVentaDetalleDto) {
    return this.ventaDetalleService.create(createVentaDetalleDto);
  }

  @Get()
  findAll() {
    return this.ventaDetalleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ventaDetalleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVentaDetalleDto: UpdateVentaDetalleDto) {
    return this.ventaDetalleService.update(+id, updateVentaDetalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ventaDetalleService.remove(+id);
  }
}