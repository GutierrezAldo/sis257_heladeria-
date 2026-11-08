import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SaborService } from './sabor.service';
import { CreateSaborDto } from './dto/create-sabor.dto';
import { UpdateSaborDto } from './dto/update-sabor.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('sabores')
export class SaborController {
  constructor(private readonly saborService: SaborService) {}

  @Post()
  create(@Body() createSaborDto: CreateSaborDto) {
    return this.saborService.create(createSaborDto);
  }

  @Get()
  findAll() {
    return this.saborService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saborService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSaborDto: UpdateSaborDto) {
    return this.saborService.update(+id, updateSaborDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saborService.remove(+id);
  }
}