import { IsNotEmpty, IsString } from "class-validator";

export class CreateSaboreDto {
        @IsString({message:'El campo nombre es obligatorio'})
        @IsNotEmpty({message:'El campo precio es obligatorio'})
        nombre: string;
         @IsString({message:'El campo nombre es obligatorio'})
        @IsNotEmpty({message:'El campo precio es obligatorio'})
        descripcion: string;
         @IsString({message:'El campo nombre es obligatorio'})
        @IsNotEmpty({message:'El campo precio es obligatorio'})
        precio: number;
        
}
