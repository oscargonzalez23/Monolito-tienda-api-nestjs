/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Producto } from './producto.entity';
import { Proveedor } from '../proveedores/proveedor.entity';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto) private readonly productoRepo: Repository<Producto>,
    @InjectRepository(Proveedor) private readonly proveedorRepo: Repository<Proveedor>,
  ) {}

  async create(dto: CreateProductoDto) {
    await this.ensureProveedor(dto.proveedorId);
    return this.productoRepo.save(this.productoRepo.create(dto as any));
  }

  findAll() {
    return this.productoRepo.find({ relations: ['proveedor'] });
  }

  async findOne(id: number) {
    const prod = await this.productoRepo.findOne({ where: { id }, relations: ['proveedor'] });
    if (!prod) throw new NotFoundException('Producto no encontrado');
    return prod;
  }

  async update(id: number, dto: UpdateProductoDto) {
    const prod = await this.findOne(id);
    if (dto.proveedorId) await this.ensureProveedor(dto.proveedorId);
    Object.assign(prod, dto);
    return this.productoRepo.save(prod);
  }

  async remove(id: number) {
    const prod = await this.findOne(id);
    await this.productoRepo.remove(prod);
    return { message: 'Producto eliminado' };
  }

  private async ensureProveedor(proveedorId: number) {
    const prov = await this.proveedorRepo.findOne({ where: { id: proveedorId } });
    if (!prov) throw new NotFoundException('Proveedor inválido');
  }
}
