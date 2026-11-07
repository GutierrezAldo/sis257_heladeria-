import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolModule } from './rol/rol.module';
import { SaborModule } from './sabor/sabor.module';
import { TamanosModule } from './tamanos/tamanos.module';
import { PresentacionesModule } from './presentaciones/presentaciones.module';
import { ProductoModule } from './producto/producto.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ProveedorModule } from './proveedor/proveedor.module';
import { ClienteModule } from './cliente/cliente.module';
import { CompraModule } from './compra/compra.module';
import { CompraDetalleModule } from './compra_detalle/compra_detalle.module';
import { VentaModule } from './venta/venta.module';
import { VentaDetalleModule } from './venta_detalle/venta_detalle.module';
import { PedidoModule } from './pedido/pedido.module';
import { AuthModule } from './auth/auth.module';

const isLocal = process.env.DB_HOST === 'localhost' || process.env.DB_HOST === '127.0.0.1';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number.parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true,
    }),
    RolModule,
    SaborModule,
    TamanosModule,
    PresentacionesModule,
    ProductoModule,
    EmpleadoModule,
    UsuarioModule,
    ProveedorModule,
    ClienteModule,
    CompraModule,
    CompraDetalleModule,
    VentaModule,
    VentaDetalleModule,
    PedidoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}