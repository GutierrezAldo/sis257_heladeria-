import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('presentacion')
export class Presentacion {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 100 })
  nombre: string;

  @Column({ type: 'float' })
  precio: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;
}
