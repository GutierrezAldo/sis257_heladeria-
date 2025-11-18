import { Sabor } from 'src/sabores/entities/sabor.entity';
import { Presentacion } from 'src/presentaciones/entities/presentacion.entity';
import { Tamaño } from 'src/tamaños/entities/tamaño.entity';
import { Venta } from './venta.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('detalle_ventas')
export class DetalleVenta {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  cantidad: number;

  @Column({ name: 'precio_sabor', type: 'numeric', precision: 10, scale: 2 })
  precioSabor: number;

  @Column({
    name: 'precio_presentacion',
    type: 'numeric',
    precision: 10,
    scale: 2,
  })
  precioPresentacion: number;

  @Column({ name: 'precio_tamaño', type: 'numeric', precision: 10, scale: 2 })
  precioTamaño: number;

  @Column({ name: 'precio_unitario', type: 'numeric', precision: 10, scale: 2 })
  precioUnitario: number;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false })
  subtotal: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @Column({ name: 'fecha_anulacion', type: 'timestamp', nullable: true })
  fechaAnulacion: Date | null;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  // Relación con Venta (varios detalles pueden tener una venta - M a 1)
  @ManyToOne(() => Venta, (venta) => venta.ventadetalles)
  @JoinColumn({ name: 'id_venta', referencedColumnName: 'id' })
  venta: Venta;

  // Relación con Sabor (varios detalles pueden tener un sabor - M a 1)
  @ManyToOne(() => Sabor, { eager: true })
  @JoinColumn({ name: 'id_sabor', referencedColumnName: 'id' })
  sabor: Sabor;

  // Relación con Presentación (varios detalles pueden tener una presentación - M a 1)
  @ManyToOne(() => Presentacion, { eager: true })
  @JoinColumn({ name: 'id_presentacion', referencedColumnName: 'id' })
  presentacion: Presentacion;

  // Relación con Tamaño (varios detalles pueden tener un tamaño - M a 1)
  @ManyToOne(() => Tamaño, { eager: true })
  @JoinColumn({ name: 'id_tamaño', referencedColumnName: 'id' })
  tamaño: Tamaño;
}
