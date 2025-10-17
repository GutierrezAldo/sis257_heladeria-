import { Module } from '@nestjs/common';
import { TamañosService } from './tamaños.service';
import { TamañosController } from './tamaños.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tamaño} from './entities/tamaño.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Tamaño])],
  controllers: [TamañosController],
  providers: [TamañosService],
})
export class TamañosModule {}
