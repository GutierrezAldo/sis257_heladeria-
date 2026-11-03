import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { VentaDetalle } from '../../venta_detalle/entities/venta_detalle.entity';

@Entity('ventas')
export class Venta {
  @PrimaryGeneratedColumn('identity', { name: 'id_venta' })
  id: number;

  @Column('integer', { name: 'id_usuario' })
  idUsuario: number;

  @Column('integer', { name: 'id_cliente' })
  idCliente: number;

  @Column('date')
  fecha: Date;

  @Column('decimal', { precision: 10, scale: 2, name: 'total_venta' })
  totalVenta: number;

  @Column('varchar', { length: 20, default: 'ACTIVO' })
  estado: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' })
  usuario: Usuario;

  @ManyToOne(() => Cliente)
  @JoinColumn({ name: 'id_cliente', referencedColumnName: 'id' })
  cliente: Cliente;

  @OneToMany(() => VentaDetalle, detalle => detalle.venta)
  detalles: VentaDetalle[];
}