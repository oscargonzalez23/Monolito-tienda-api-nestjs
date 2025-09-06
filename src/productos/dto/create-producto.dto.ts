/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Teclado Mecánico',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 199.99,
  })
  @Type(() => Number)
  @IsNumber()
  precio: number;

  @ApiProperty({
    description: 'ID del proveedor asociado',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  proveedorId: number;
}
