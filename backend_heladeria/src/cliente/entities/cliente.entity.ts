import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn('identity', { name: 'id_cliente' })
  id: number;

  @Column('varchar', { length: 20 })
  ci: string;

  @Column('varchar', { length: 150, name: 'razon_social' })
  razonSocial: string;

  @Column('varchar', { length: 20 })
  telefono: string;

  @Column('varchar', { length: 100 })
  email: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  //  next time maybe .-.
  // @OneToMany(() => Venta, venta => venta.cliente)
  // ventas: Venta[];

  // @OneToMany(() => Pedido, pedido => pedido.cliente)
  // pedidos: Pedido[];
}