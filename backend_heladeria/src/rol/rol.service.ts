import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RolService {
  constructor(@InjectRepository(Rol) private rolesRepository: Repository<Rol>) {}

  async create(createRolDto: CreateRolDto): Promise<Rol> {
    let rol = await this.rolesRepository.findOneBy({
      nombreRol: createRolDto.nombreRol,
    });
    if (rol) throw new ConflictException('El rol ya existe');

    rol = new Rol();
    Object.assign(rol, createRolDto);
    return this.rolesRepository.save(rol);
  }

  async findAll(): Promise<Rol[]> {
    return this.rolesRepository.find({ order: { nombreRol: 'ASC' } });
  }

  async findOne(id: number): Promise<Rol> {
    const rol = await this.rolesRepository.findOneBy({ id });
    if (!rol) throw new NotFoundException('El rol no existe');
    return rol;
  }

  async update(id: number, updateRolDto: UpdateRolDto): Promise<Rol> {
    const rol = await this.findOne(id);
    Object.assign(rol, updateRolDto);
    return this.rolesRepository.save(rol);
  }

  async remove(id: number): Promise<Rol> {
    const rol = await this.findOne(id);
    return this.rolesRepository.softRemove(rol);
  }
}