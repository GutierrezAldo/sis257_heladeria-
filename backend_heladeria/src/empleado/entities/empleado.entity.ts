import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Pedido } from '../../pedido/entities/pedido.entity';

@Entity('empleados')
export class Empleado {
  @PrimaryGeneratedColumn('identity', { name: 'id_empleado' })
  id: number;

  @Column('varchar', { length: 50 })
  nombre: string;

  @Column('varchar', { length: 50 })
  apellido: string;

  @Column('varchar', { length: 50 })
  cargo: string;

  @Column('varchar', { length: 20 })
  telefono: string;

  @Column('varchar', { length: 255 })
  direccion: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @OneToOne(() => Usuario, usuario => usuario.empleado)
  usuario: Usuario;
  
  @OneToMany(() => Pedido, pedido => pedido.empleado)
  pedidos: Pedido[];

}

