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
import { Proveedor } from '../../proveedor/entities/proveedor.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { CompraDetalle } from '../../compra_detalle/entities/compra_detalle.entity';

@Entity('compras')
export class Compra {
  @PrimaryGeneratedColumn('identity', { name: 'id_compra' })
  id: number;

  @Column('integer', { name: 'id_proveedor' })
  idProveedor: number;

  @Column('integer', { name: 'id_usuario' })
  idUsuario: number;

  @Column('date')
  fecha: Date;

  @Column('decimal', { precision: 10, scale: 2, name: 'total_compra' })
  totalCompra: number;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Proveedor)
  @JoinColumn({ name: 'id_proveedor', referencedColumnName: 'id' })
  proveedor: Proveedor;

  @ManyToOne(() => Usuario)
  @JoinColumn({ name: 'id_usuario', referencedColumnName: 'id' })
  usuario: Usuario;

  @OneToMany(() => CompraDetalle, detalle => detalle.compra)
  detalles: CompraDetalle[];
}