/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProveedorDto {
  @ApiProperty({
    description: 'Nombre del proveedor',
    example: 'ACME Ltda',
  })
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @ApiProperty({
    description: 'RUC único del proveedor',
    example: '900123456-7',
  })
  @IsString()
  @IsNotEmpty()
  ruc: string;
}
