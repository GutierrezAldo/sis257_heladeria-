import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
@Entity ('login')
export class Login {
@PrimaryGeneratedColumn('identity')
    usuario_id: number;
    @Column('varchar',{length: 10, name: 'nombre(cono barquillo'})
    nombre: string;
    @Column({ type: 'text', name: 'email' })
    email: string;
    @Column({ type: 'varchar', length: 255 })
    clave: string;
    @Column({ type: 'int', name: 'rol_venta_ide' })
    rol_venta_ide: number;   
    @Column({ type: 'int', name: 'id_sabor' })
    id_sabor: number;
    @Column({ type: 'int', name: 'id_tamano' })
    id_tamano: number;
    @Column({ type: 'int', name: 'id_presentacion' })
    id_presentacion: number;
    @Column({ type: 'int', default: 1 })
    cantidad: number;
    @Column({ type: 'decimal', precision: 10, scale: 2 })
    subtotal: number;
    @CreateDateColumn({name:'fecha creacion'})
    fechaCreacion: Date;
    @UpdateDateColumn({name:'fecha modificación'})
    fechaModificación: Date;
    @DeleteDateColumn({name:'fecha eliminación'})
    fechaEliminación: Date;
}