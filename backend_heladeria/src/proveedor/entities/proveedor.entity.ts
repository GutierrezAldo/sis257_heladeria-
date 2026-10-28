import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('proveedores')
export class Proveedor {
  @PrimaryGeneratedColumn('identity', { name: 'id_proveedor' })
  id: number;

  @Column('varchar', { length: 20 })
  nit: string;

  @Column('varchar', { length: 20 })
  telefono: string;

  @Column('varchar', { length: 50, name: 'tipo_producto' })
  tipoProducto: string;

  @Column('varchar', { length: 255 })
  direccion: string;

  @Column('varchar', { length: 100 })
  email: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  // Pronto...
  // @OneToMany(() => Compra, compra => compra.proveedor)
  // compras: Compra[];
}
