import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SaboresModule } from './sabores/sabores.module';
import { TamañosModule } from './tamaños/tamaños.module';
import { PresentacionesModule } from './presentaciones/presentaciones.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [__dirname + '/*/** */entities/*.{ts|js}'],
    synchronize: true,
    autoLoadEntities: true,
  }),
    SaboresModule,
    TamañosModule,
    PresentacionesModule,
    LoginModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
