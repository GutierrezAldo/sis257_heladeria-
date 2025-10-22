import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
@Entity('tamaño')
export class Tamaño {
  @PrimaryGeneratedColumn('identity')
  id: number;
  @Column('varchar', { length: 10, name: 'nombre' })
  nombre: string;
  @Column('varchar', { length: 50, name: 'cantidad bolas' })
  cantidad_bolas: string;
  @Column({ type: 'float' })
  precio: number;
  @CreateDateColumn({ name: 'fecha creacion' })
  fechaCreacion: Date;
  @UpdateDateColumn({ name: 'fecha modificación' })
  fechaModificación: Date;
  @DeleteDateColumn({ name: 'fecha eliminación' })
  fechaEliminación: Date;
}
