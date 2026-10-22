import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TamanosService } from './tamanos.service';
import { CreateTamanoDto } from './dto/create-tamano.dto';
import { UpdateTamanoDto } from './dto/update-tamano.dto';

@Controller('tamanos')
export class TamanosController {
  constructor(private readonly tamanosService: TamanosService) {}

  @Post()
  create(@Body() createTamanoDto: CreateTamanoDto) {
    return this.tamanosService.create(createTamanoDto);
  }

  @Get()
  findAll() {
    return this.tamanosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tamanosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTamanoDto: UpdateTamanoDto) {
    return this.tamanosService.update(+id, updateTamanoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tamanosService.remove(+id);
  }
}