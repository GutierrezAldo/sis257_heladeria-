import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { Venta } from './entities/venta.entity';

@ApiTags('Ventas')
@Controller('ventas')
export class VentasController {
  constructor(private readonly ventasService: VentasService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de todas las ventas' })
  async obtenerVentas() {
    return this.ventasService.obtenerVentas();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Detalle de una venta específica' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  async obtenerVentaPorId(@Param('id') id: number): Promise<Venta> {
    return this.ventasService.obtenerVentaPorId(id);
  }

  @Get(':id/detalles')
  @ApiResponse({ status: 200, description: 'Detalles de una venta específica' })
  @ApiResponse({ status: 404, description: 'Detalles no encontrados' })
  async obtenerVentaDetalles(@Param('id') id: number) {
    return this.ventasService.obtenerVentaDetalles(id);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Venta creada exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos inválidos o error de stock' })
  async crearVenta(@Body() createVentaDto: CreateVentaDto): Promise<Venta> {
    return this.ventasService.crearVenta(createVentaDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Venta eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Venta no encontrada' })
  @ApiResponse({ status: 500, description: 'Error al eliminar la venta' })
  async eliminarVentaPorId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ mensaje: string; ventaEliminada: Venta }> {
    return this.ventasService.eliminarVenta(id);
  }
}
