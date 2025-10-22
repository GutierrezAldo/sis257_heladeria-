import { Module } from '@nestjs/common';
import { TamañosService } from './tamaños.service';
import { TamañosController } from './tamaños.controller';

@Module({
  controllers: [TamañosController],
  providers: [TamañosService],
})
export class TamañosModule {}
