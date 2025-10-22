import { Module } from '@nestjs/common';
import { SaboresService } from './sabores.service';
import { SaboresController } from './sabores.controller';

@Module({
  controllers: [SaboresController],
  providers: [SaboresService],
})
export class SaboresModule {}
