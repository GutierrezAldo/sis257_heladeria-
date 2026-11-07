import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Rol } from '../../rol/entities/rol.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Compra } from '../../compra/entities/compra.entity';
import { Venta } from '../../venta/entities/venta.entity';
import { compare, genSalt, hash } from 'bcryptjs';

@Entity('usuarios')
export class Usuario {
  @PrimaryGeneratedColumn('identity', { name: 'id_usuario' })
  id: number;

  @Column('varchar', { length: 50 })
  usuario: string;

  @Column('varchar', { length: 250 })
  clave: string;

  @Column('varchar', { length: 20, default: 'ACTIVO' })
  estado: string;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fechaCreacion: Date;

  @UpdateDateColumn({ name: 'fecha_modificacion' })
  fechaModificacion: Date;

  @DeleteDateColumn({ name: 'fecha_eliminacion' })
  fechaEliminacion: Date;

  @ManyToOne(() => Rol)
  @JoinColumn({ name: 'id_rol' })
  rol: Rol;

  @OneToOne(() => Empleado)
  @JoinColumn({ name: 'id_empleado' })
  empleado: Empleado;

  @OneToMany(() => Compra, compra => compra.usuario)
  compras: Compra[];

  @OneToMany(() => Venta, venta => venta.usuario)
  ventas: Venta[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.clave && !this.clave.startsWith('$2')) {
      const salt = await genSalt();
      this.clave = await hash(this.clave, salt);
    }
  }

  async validatePassword(plainPassword: string): Promise<boolean> {
    return compare(plainPassword, this.clave);
  }
}