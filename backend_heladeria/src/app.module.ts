import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaboresModule } from './sabores/sabores.module';
import { TamañosModule } from './tamaños/tamaños.module';
import { PresentacionesModule } from './presentaciones/presentaciones.module';

@Module({
  imports: [
    
    ConfigModule.forRoot({
      isGlobal: true, 
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),

    SaboresModule,
    TamañosModule,
    PresentacionesModule,
  ],
})
export class AppModule {}