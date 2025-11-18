import {
  Injectable,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { DetalleVenta } from './entities/detalle_venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { Sabor } from 'src/sabores/entities/sabor.entity';
import { Presentacion } from 'src/presentaciones/entities/presentacion.entity';
import { Tamaño } from 'src/tamaños/entities/tamaño.entity';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class VentasService {
  constructor(
    @InjectRepository(Venta)
    private ventaRepository: Repository<Venta>,
    @InjectRepository(DetalleVenta)
    private detalleVentaRepository: Repository<DetalleVenta>,
    @InjectRepository(Sabor)
    private saborRepository: Repository<Sabor>,
    @InjectRepository(Presentacion)
    private presentacionRepository: Repository<Presentacion>,
    @InjectRepository(Tamaño)
    private tamañoRepository: Repository<Tamaño>,
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private dataSource: DataSource,
  ) {}

  async obtenerVentas(): Promise<Venta[]> {
    console.log('Obteniendo todas las ventas...');
    const ventas = await this.ventaRepository.find({
      relations: [
        'usuario',
        'ventadetalles',
        'ventadetalles.sabor',
        'ventadetalles.presentacion',
        'ventadetalles.tamaño',
      ],
    });
    console.log('Ventas obtenidas:', ventas);
    return ventas;
  }

  async obtenerVentaPorId(id: number): Promise<Venta> {
    console.log(`Buscando venta por ID: ${id}`);
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: [
        'usuario',
        'ventadetalles',
        'ventadetalles.sabor',
        'ventadetalles.presentacion',
        'ventadetalles.tamaño',
      ],
    });

    if (!venta) {
      console.log(`No se encontró la venta con ID: ${id}`);
      throw new NotFoundException(`La venta con ID ${id} no fue encontrada`);
    }

    console.log('Venta encontrada:', venta);
    return venta;
  }

  async obtenerVentaDetalles(id: number): Promise<DetalleVenta[]> {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: [
        'ventadetalles',
        'ventadetalles.sabor',
        'ventadetalles.presentacion',
        'ventadetalles.tamaño',
      ],
    });

    if (!venta) {
      throw new NotFoundException(`La venta con ID ${id} no fue encontrada`);
    }

    if (!venta.ventadetalles || venta.ventadetalles.length === 0) {
      throw new NotFoundException(
        `No se encontraron detalles para la venta con ID ${id}`,
      );
    }

    return venta.ventadetalles;
  }

  async crearVenta(createVentaDto: CreateVentaDto): Promise<Venta> {
    console.log('Iniciando creación de venta con DTO:', createVentaDto);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      console.log(`Buscando usuario con ID: ${createVentaDto.idUsuario}`);
      const usuario = await this.usuarioRepository.findOne({
        where: { id: createVentaDto.idUsuario },
      });
      if (!usuario) {
        console.log(`Usuario con ID ${createVentaDto.idUsuario} no encontrado`);
        throw new NotFoundException(
          `Usuario con ID ${createVentaDto.idUsuario} no encontrado`,
        );
      }
      console.log('Usuario encontrado:', usuario);

      // Validar montoPagado en el DTO
      if (
        typeof createVentaDto.montoPagado !== 'number' ||
        isNaN(createVentaDto.montoPagado) ||
        createVentaDto.montoPagado < 0
      ) {
        throw new BadRequestException(
          'El monto pagado debe ser un número positivo',
        );
      }

      const nuevaVenta = this.ventaRepository.create({
        metodoPago: createVentaDto.metodoPago || 'efectivo',
        totalVenta: 0,
        estado: 'realizada',
        montoPagado: 0, // Se actualizará después de calcular el total
        cambio: 0, // Se actualizará después de calcular el total
        nombreCliente: createVentaDto.nombreCliente || null,
        documento: createVentaDto.documento || null,
      });

      nuevaVenta.usuario = usuario;

      console.log('Guardando nueva venta (sin detalles aún)...', nuevaVenta);
      const ventaGuardada = await queryRunner.manager.save(nuevaVenta);
      //console.log('Venta guardada:', ventaGuardada);

      let totalVenta = 0;

      if (!createVentaDto.detalles || !createVentaDto.detalles.length) {
        console.log('No se proporcionaron detalles de venta');
        throw new BadRequestException(
          'La venta debe contener al menos un detalle',
        );
      }

      for (const detalle of createVentaDto.detalles) {
        //console.log('Procesando detalle:', detalle);

        // Buscar sabor
        const sabor = await this.saborRepository.findOne({
          where: { id: detalle.idSabor },
        });
        if (!sabor) {
          console.log(`Sabor con ID ${detalle.idSabor} no encontrado`);
          throw new NotFoundException(
            `Sabor con ID ${detalle.idSabor} no encontrado`,
          );
        }

        // Buscar presentación
        const presentacion = await this.presentacionRepository.findOne({
          where: { id: detalle.idPresentacion },
        });
        if (!presentacion) {
          console.log(
            `Presentación con ID ${detalle.idPresentacion} no encontrada`,
          );
          throw new NotFoundException(
            `Presentación con ID ${detalle.idPresentacion} no encontrada`,
          );
        }

        // Buscar tamaño
        const tamaño = await this.tamañoRepository.findOne({
          where: { id: detalle.idTamaño },
        });
        if (!tamaño) {
          console.log(`Tamaño con ID ${detalle.idTamaño} no encontrado`);
          throw new NotFoundException(
            `Tamaño con ID ${detalle.idTamaño} no encontrado`,
          );
        }

        console.log('Elementos encontrados:', { sabor, presentacion, tamaño });

        const cantidadNum = Number(detalle.cantidad);
        if (isNaN(cantidadNum) || cantidadNum <= 0) {
          console.log(`Cantidad inválida:`, detalle.cantidad);
          throw new BadRequestException(
            `La cantidad debe ser un número positivo`,
          );
        }

        // Calcular precios
        const precioSabor = Number(sabor.precio);
        const precioPresentacion = Number(presentacion.precio);
        const precioTamaño = Number(tamaño.precio);
        const precioUnitario = precioSabor + precioPresentacion + precioTamaño;
        const subtotal = precioUnitario * cantidadNum;

        console.log(
          `Creando detalle: Sabor=${sabor.nombre} (${precioSabor}), Presentación=${presentacion.nombre} (${precioPresentacion}), Tamaño=${tamaño.nombre} (${precioTamaño})`,
        );
        console.log(
          `Precio unitario=${precioUnitario}, cantidad=${cantidadNum}, subtotal=${subtotal}`,
        );

        const nuevoDetalle = this.detalleVentaRepository.create({
          cantidad: cantidadNum,
          precioSabor: precioSabor,
          precioPresentacion: precioPresentacion,
          precioTamaño: precioTamaño,
          precioUnitario: precioUnitario,
          subtotal: subtotal,
          venta: { id: ventaGuardada.id },
          sabor: sabor,
          presentacion: presentacion,
          tamaño: tamaño,
        });

        await queryRunner.manager.save(nuevoDetalle);
        //console.log('Detalle de venta guardado:', nuevoDetalle);

        totalVenta += subtotal;
        console.log(
          `Subtotal sumado al totalVenta. Total actual: ${totalVenta}`,
        );
      }

      // Calcular cambio
      const montoPagado = Number(createVentaDto.montoPagado);
      if (montoPagado < totalVenta) {
        throw new BadRequestException(
          `El monto pagado (${montoPagado}) es menor al total de la venta (${totalVenta})`,
        );
      }
      const cambio = Number((montoPagado - totalVenta).toFixed(2));

      ventaGuardada.totalVenta = totalVenta;
      ventaGuardada.montoPagado = montoPagado;
      ventaGuardada.cambio = cambio;
      await queryRunner.manager.save(ventaGuardada);
      console.log('Total de la venta, monto pagado y cambio actualizados:', {
        totalVenta,
        montoPagado,
        cambio,
      });

      await queryRunner.commitTransaction();
      console.log('Transacción confirmada. Venta creada exitosamente.');

      return this.obtenerVentaPorId(ventaGuardada.id);
    } catch (error) {
      console.log('Ocurrió un error durante la creación de la venta:', error);
      await queryRunner.rollbackTransaction();

      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new InternalServerErrorException(
        'Error al procesar la venta: ' + errorMessage,
      );
    } finally {
      await queryRunner.release();
      console.log('QueryRunner liberado.');
    }
  }

  async eliminarVenta(id: number): Promise<{
    mensaje: string;
    ventaEliminada: Venta;
  }> {
    console.log(`Iniciando eliminación de venta con ID: ${id}`);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const venta = await this.ventaRepository.findOne({
        where: { id },
        relations: ['ventadetalles', 'usuario'],
      });

      if (!venta) {
        console.log(`Venta con ID ${id} no encontrada para eliminar`);
        throw new NotFoundException(`La venta con ID ${id} no fue encontrada`);
      }

      console.log('Eliminando detalles de la venta...');
      let detallesEliminados = 0;
      if (venta.ventadetalles && venta.ventadetalles.length > 0) {
        for (const detalle of venta.ventadetalles) {
          await queryRunner.manager.softRemove(DetalleVenta, detalle);
          detallesEliminados++;
        }
      }

      // Soft-remove la venta
      await queryRunner.manager.softRemove(Venta, venta);
      console.log(
        `Venta eliminada (soft-delete): ID ${id}, Detalles eliminados: ${detallesEliminados}`,
      );

      await queryRunner.commitTransaction();
      console.log('Transacción de eliminación confirmada.');

      return {
        mensaje: `Venta con ID ${id} eliminada exitosamente. Detalles eliminados: ${detallesEliminados}`,
        ventaEliminada: venta,
      };
    } catch (error) {
      console.log(
        'Ocurrió un error durante la eliminación de la venta:',
        error,
      );
      await queryRunner.rollbackTransaction();

      if (error instanceof NotFoundException) {
        throw error;
      }
      const errorMessage =
        error instanceof Error ? error.message : 'Error desconocido';
      throw new InternalServerErrorException(
        'Error al eliminar la venta: ' + errorMessage,
      );
    } finally {
      await queryRunner.release();
      console.log('QueryRunner liberado tras eliminación.');
    }
  }
}
