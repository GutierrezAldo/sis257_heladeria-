import { Module } from '@nestjs/common';
import { PresentacionesService } from './presentaciones.service';
import { PresentacionesController } from './presentaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presentacione} from './entities/presentacione.entity';
@Module({
  imports:[TypeOrmModule.forFeature([Presentacione])],
  controllers: [PresentacionesController],
  providers: [PresentacionesService],
  
})
export class PresentacionesModule {}
