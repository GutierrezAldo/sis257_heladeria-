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
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';

@Entity('pedidos')
export class Pedido {
  @PrimaryGeneratedColumn('identity', { name: 'id_pedido' })
  id: number;

  @Column('integer', { name: 'id_cliente' })
  idCliente: number;

  @Column('integer', { name: 'id_empleado' })
  idEmpleado: number;

  @Column('date', { name: 'fecha_pedido' })
  fechaPedido: Date;

  @Column('varchar', { length: 50, name: 'tipo_pago' })
  tipoPago: string;

  @Column('varchar', { length: 20, default: 'PENDIENTE' })
  estado: string;

  @Column('decimal', { precision: 10, scale: 2, name: 'total_pedido' })
  totalPedido: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  cliente: Cliente;

  @ManyToOne(() => Empleado)
  @JoinColumn({ name: 'id_empleado', referencedColumnName: 'id' })
  empleado: Empleado;
}