import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('roles')
export class Rol {
  @PrimaryGeneratedColumn('identity', { name: 'id_rol' })
  id: number;

  @Column('varchar', { length: 50, name: 'nombre_rol' })
  nombreRol: string;

  @Column('varchar', { length: 255 })
  descripcion: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

}