import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Venta } from '../../venta/entities/venta.entity';
import { Producto } from '../../producto/entities/producto.entity';

@Entity('venta_detalles')
export class VentaDetalle {
  @PrimaryGeneratedColumn('identity', { name: 'id_detalle' })
  id: number;

  @Column('integer', { name: 'id_venta' })
  idVenta: number;

  @Column('integer', { name: 'id_producto' })
  idProducto: number;

  @Column('integer')
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2, name: 'precio_unitario' })
  precioUnitario: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Venta, venta => venta.detalles)
  @JoinColumn({ name: 'id_venta', referencedColumnName: 'id' })
  venta: Venta;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;
}