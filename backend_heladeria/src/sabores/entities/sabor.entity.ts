import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sabor')
export class Sabor {
  @PrimaryGeneratedColumn('identity')
  id: number;

  @Column('varchar', { length: 100, name: 'nombre' })
  nombre: string;

  @Column('varchar', { length: 250, name: 'descripcion' })
  descripcion: string;

  @Column({ type: 'float' })
  precio: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;
}
