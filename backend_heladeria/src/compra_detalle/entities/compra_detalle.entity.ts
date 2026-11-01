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
import { Compra } from '../../compra/entities/compra.entity';
import { Producto } from '../../producto/entities/producto.entity';

@Entity('compra_detalles')
export class CompraDetalle {
  @PrimaryGeneratedColumn('identity', { name: 'id_detalle_compra' })
  id: number;

  @Column('integer', { name: 'id_compra' })
  idCompra: number;

  @Column('integer', { name: 'id_producto' })
  idProducto: number;

  @Column('integer')
  cantidad: number;

  @Column('decimal', { precision: 10, scale: 2, name: 'precio_unitario' })
  precioUnitario: number;

  @Column('decimal', { precision: 10, scale: 2 })
  subtotal: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Compra, compra => compra.detalles)
  @JoinColumn({ name: 'id_compra', referencedColumnName: 'id' })
  compra: Compra;

  @ManyToOne(() => Producto)
  @JoinColumn({ name: 'id_producto', referencedColumnName: 'id' })
  producto: Producto;
}