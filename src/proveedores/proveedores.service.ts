/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Proveedor } from './proveedor.entity';
import { Producto } from '../productos/producto.entity';
import { CreateProveedorDto } from './dto/create-proveedor.dto';
import { UpdateProveedorDto } from './dto/update-proveedor.dto';

@Injectable()
export class ProveedoresService {
  constructor(
    @InjectRepository(Proveedor)
    private readonly proveedorRepo: Repository<Proveedor>,
    @InjectRepository(Producto)
    private readonly productoRepo: Repository<Producto>,
  ) {}

  async create(dto: CreateProveedorDto) {
    const dup = await this.proveedorRepo.findOne({ where: { ruc: dto.ruc } });
    if (dup) throw new ConflictException('El RUC ya está registrado');
    return this.proveedorRepo.save(this.proveedorRepo.create(dto));
  }

  findAll() {
    return this.proveedorRepo.find();
  }

  async findOne(id: number) {
    const prov = await this.proveedorRepo.findOne({ where: { id } });
    if (!prov) throw new NotFoundException('Proveedor no encontrado');
    return prov;
  }

  async update(id: number, dto: UpdateProveedorDto) {
    const prov = await this.findOne(id);
    if (dto.ruc && dto.ruc !== prov.ruc) {
      const dup = await this.proveedorRepo.findOne({ where: { ruc: dto.ruc } });
      if (dup) throw new ConflictException('El RUC ya está registrado');
    }
    Object.assign(prov, dto);
    return this.proveedorRepo.save(prov);
  }

  async remove(id: number) {
    const prov = await this.findOne(id);
    const count = await this.productoRepo.count({ where: { proveedorId: id } });
    if (count > 0) {
      throw new BadRequestException('No se puede eliminar: tiene productos asociados');
    }
    await this.proveedorRepo.remove(prov);
    return { message: 'Proveedor eliminado' };
  }
}
