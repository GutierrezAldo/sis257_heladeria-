import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SaboresService } from './sabores.service';
import { CreateSaboreDto } from './dto/create-sabore.dto';
import { UpdateSaboreDto } from './dto/update-sabore.dto';

@Controller('sabores')
export class SaboresController {
  constructor(private readonly saboresService: SaboresService) {}

  @Post()
  create(@Body() createSaboreDto: CreateSaboreDto) {
    return this.saboresService.create(createSaboreDto);
  }

  @Get()
  findAll() {
    return this.saboresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saboresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaboreDto: UpdateSaboreDto) {
    return this.saboresService.update(+id, updateSaboreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saboresService.remove(+id);
  }
}
