import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('presentacione')
export class Presentacione {
  @PrimaryGeneratedColumn('identity')
  id: number;
  @Column('varchar', { length: 10, name: 'nombre(cono barquillo' })
  nombre: string;
  @Column({ type: 'float' })
  precio: number;
  @CreateDateColumn({ name: 'fecha creacion' })
  fechaCreacion: Date;
  @UpdateDateColumn({ name: 'fecha modificación' })
  fechaModificación: Date;
  @DeleteDateColumn({ name: 'fecha eliminación' })
  fechaEliminación: Date;
}
