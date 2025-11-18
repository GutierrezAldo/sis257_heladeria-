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
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuarioesRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const existe = await this.usuarioesRepository.findOneBy({
      usuario: createUsuarioDto.usuario.trim(),
    });

    if (existe) throw new ConflictException('El usuario ya existe');

    const usuario = new Usuario();
    usuario.usuario = createUsuarioDto.usuario.trim();
    usuario.email = createUsuarioDto.email.trim();
    usuario.clave = createUsuarioDto.clave.trim();
    return this.usuarioesRepository.save(usuario);
  }

  async findAll() {
    return this.usuarioesRepository.find({ order: { usuario: 'ASC' } });
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioesRepository.findOneBy({ id });
    if (!usuario) throw new NotFoundException('El usuario no existe');
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    const usuario = await this.findOne(id);
    const usuarioUpdate = Object.assign(usuario, updateUsuarioDto);
    return this.usuarioesRepository.save(usuarioUpdate);
  }

  async remove(id: number) {
    const usuario = await this.findOne(id);
    if (usuario) return this.usuarioesRepository.softRemove(usuario);
  }

  async validate(usuario: string, clave: string): Promise<Usuario> {
    const usuarioOk = await this.usuarioesRepository.findOne({
      where: { usuario },
      select: ['id', 'usuario', 'email', 'clave'],
    });

    if (!usuarioOk) throw new NotFoundException('Usuario inexistente');

    if (!(await usuarioOk?.validatePassword(clave))) {
      throw new UnauthorizedException('Clave incorrecta');
    }

    usuarioOk.clave = '';
    return usuarioOk;
  }
}
