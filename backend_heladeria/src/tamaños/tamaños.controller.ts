import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TamañosService } from './tamaños.service';
import { CreateTamañoDto } from './dto/create-tamaño.dto';
import { UpdateTamañoDto } from './dto/update-tamaño.dto';

@Controller('tamaños')
export class TamañosController {
  constructor(private readonly tamañosService: TamañosService) {}

  @Post()
  create(@Body() createTamañoDto: CreateTamañoDto) {
    return this.tamañosService.create(createTamañoDto);
  }

  @Get()
  findAll() {
    return this.tamañosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tamañosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTamañoDto: UpdateTamañoDto) {
    return this.tamañosService.update(+id, updateTamañoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tamañosService.remove(+id);
  }
}
