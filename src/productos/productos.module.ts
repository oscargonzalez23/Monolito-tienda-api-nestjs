/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { Producto } from './producto.entity';
import { Proveedor } from '../proveedores/proveedor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Proveedor])],
  controllers: [ProductosController],
  providers: [ProductosService],
})
export class ProductosModule {}
