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
import { Producto } from '../../producto/entities/producto.entity';

@Entity('sabores')
export class Sabor {
  @PrimaryGeneratedColumn('identity', { name: 'id_sabor' })
  id: number;

  @ManyToOne(() => Producto, producto => producto.sabores)
  @JoinColumn({ name: 'id_producto' })
  producto: Producto;

  @Column('varchar', { length: 50 })
  nombre: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

}