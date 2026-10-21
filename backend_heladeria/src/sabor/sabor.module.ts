import { Module } from '@nestjs/common';
import { SaborService } from './sabor.service';
import { SaborController } from './sabor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sabor } from './entities/sabor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sabor])],
  controllers: [SaborController],
  providers: [SaborService],
})
export class SaborModule {}