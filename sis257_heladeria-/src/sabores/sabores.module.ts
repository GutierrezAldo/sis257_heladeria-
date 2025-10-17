import { Module } from '@nestjs/common';
import { SaboresService } from './sabores.service';
import { SaboresController } from './sabores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sabore } from './entities/sabore.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Sabore])],
  controllers: [SaboresController],
  providers: [SaboresService],
})
export class SaboresModule {}
