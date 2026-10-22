import { Module } from '@nestjs/common';
import { TamanosService } from './tamanos.service';
import { TamanosController } from './tamanos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tamano } from './entities/tamano.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tamano])],
  controllers: [TamanosController],
  providers: [TamanosService],
})
export class TamanosModule {}