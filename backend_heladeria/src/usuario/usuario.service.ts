import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(@InjectRepository(Usuario) private usuariosRepository: Repository<Usuario>) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    let usuario = await this.usuariosRepository.findOneBy({
      usuario: createUsuarioDto.usuario,
    });
    if (usuario) throw new ConflictException('El nombre de usuario ya existe');

    usuario = new Usuario();
    usuario.usuario = createUsuarioDto.usuario;
    usuario.clave = createUsuarioDto.clave;
    usuario.estado = createUsuarioDto.estado;
    usuario.rol = { id: createUsuarioDto.idRol } as any;
    usuario.empleado = { id: createUsuarioDto.idEmpleado } as any;

    return this.usuariosRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find({
      relations: { rol: true, empleado: true },
    });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepository.findOne({
      where: { id },
      relations: { rol: true, empleado: true },
    });
    if (!usuario) throw new NotFoundException('El usuario no existe');
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    
    if (updateUsuarioDto.usuario) usuario.usuario = updateUsuarioDto.usuario;
    if (updateUsuarioDto.clave) usuario.clave = updateUsuarioDto.clave;
    if (updateUsuarioDto.estado) usuario.estado = updateUsuarioDto.estado;
    if (updateUsuarioDto.idRol) usuario.rol = { id: updateUsuarioDto.idRol } as any;
    if (updateUsuarioDto.idEmpleado) usuario.empleado = { id: updateUsuarioDto.idEmpleado } as any;

    return this.usuariosRepository.save(usuario);
  }

  async remove(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);
    return this.usuariosRepository.softRemove(usuario);
  }

  async validate(usuarioStr: string, clave: string): Promise<Usuario> {
    const usuarioOk = await this.usuariosRepository.findOne({
      where: { usuario: usuarioStr },
      select: { id: true, usuario: true, clave: true, estado: true },
      relations: { rol: true, empleado: true } 
    });

    if (!usuarioOk) throw new NotFoundException('Usuario inexistente');

    if (!(await usuarioOk?.validatePassword(clave))) {
      throw new UnauthorizedException('Clave incorrecta');
    }

    usuarioOk.clave = '';
    return usuarioOk;
  }
}