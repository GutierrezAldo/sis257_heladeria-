import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CompraDetalleService } from './compra_detalle.service';
import { CreateCompraDetalleDto } from './dto/create-compra_detalle.dto';
import { UpdateCompraDetalleDto } from './dto/update-compra_detalle.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('compra-detalles')
export class CompraDetalleController {
  constructor(private readonly compraDetalleService: CompraDetalleService) {}

  @Post()
  create(@Body() createCompraDetalleDto: CreateCompraDetalleDto) {
    return this.compraDetalleService.create(createCompraDetalleDto);
  }

  @Get()
  findAll() {
    return this.compraDetalleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.compraDetalleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompraDetalleDto: UpdateCompraDetalleDto) {
    return this.compraDetalleService.update(+id, updateCompraDetalleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.compraDetalleService.remove(+id);
  }
}