import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('presentaciones')
export class Presentacion {
  @PrimaryGeneratedColumn('identity', { name: 'id_presentacion' })
  id: number;

  @Column('int', { name: 'id_producto' })
  idProducto: number;

  @Column('varchar', { length: 50 })
  nombre: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

}