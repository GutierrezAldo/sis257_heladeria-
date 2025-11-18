import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PresentacionesService } from './presentaciones.service';
import { CreatePresentacionDto } from './dto/create-presentacion.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdatePresentacionDto } from './dto/update-presentacion.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Presentaciones')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('presentaciones')
export class PresentacionesController {
  constructor(private readonly presentacionesService: PresentacionesService) {}

  @Post()
  create(@Body() createPresentacionDto: CreatePresentacionDto) {
    return this.presentacionesService.create(createPresentacionDto);
  }

  @Get()
  findAll() {
    return this.presentacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presentacionesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePresentacionDto: UpdatePresentacionDto,
  ) {
    return this.presentacionesService.update(+id, updatePresentacionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presentacionesService.remove(+id);
  }
}
