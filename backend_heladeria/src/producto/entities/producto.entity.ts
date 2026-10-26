import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sabor } from '../../sabor/entities/sabor.entity';
import { Tamano } from '../../tamanos/entities/tamano.entity';
import { Presentacion } from '../../presentaciones/entities/presentacion.entity';

@Entity('productos')
export class Producto {
  @PrimaryGeneratedColumn('identity', { name: 'id_producto' })
  id: number;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;

  @Column('int')
  stock: number;

  @Column('varchar', { length: 20, default: 'ACTIVO' })
  estado: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  // Relaciones "Uno a Muchos"
  @OneToMany(() => Sabor, sabor => sabor.producto)
  sabores: Sabor[];

  @OneToMany(() => Tamano, tamano => tamano.producto)
  tamanos: Tamano[];

  @OneToMany(() => Presentacion, presentacion => presentacion.producto)
  presentaciones: Presentacion[];
}