/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Proveedor } from '../proveedores/proveedor.entity';

@Entity()
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column('decimal')
  precio: number;

  @Column()
  proveedorId: number;

  @ManyToOne(() => Proveedor, (prov) => prov.productos, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'proveedorId' })
  proveedor: Proveedor;
}
