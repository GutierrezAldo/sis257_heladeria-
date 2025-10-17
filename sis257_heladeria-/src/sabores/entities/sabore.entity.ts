import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity ('sabore')
export class Sabore {
    @PrimaryGeneratedColumn('identity')
    id: number;
    @Column('varchar',{length: 10, name: 'nombre'})
    nombre: string;
    @Column('varchar',{length: 50, name: 'descripcion'})
    descripcion: string;
     @Column({ type: 'float' })
    precio: number;
    @CreateDateColumn({name:'fecha creacion'})
    fechaCreacion: Date;
    @UpdateDateColumn({name:'fecha modificación'})
    fechaModificación: Date;
    @DeleteDateColumn({name:'fecha eliminación'})
    fechaEliminación: Date;
}
