import { IsString, IsNumber, IsBoolean, IsDateString, Min, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateFlatDto {
  @ApiProperty({
    description: 'Ciudad donde se encuentra el departamento',
    example: 'Madrid'
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'Nombre de la calle',
    example: 'Gran Vía'
  })
  @IsString()
  @IsNotEmpty()
  streetName: string;

  @ApiProperty({
    description: 'Número de la calle',
    example: 123
  })
  @IsNumber()
  @IsNotEmpty()
  streetNumber: number;

  @ApiProperty({
    description: 'Tamaño del departamento en metros cuadrados',
    example: 80
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  areaSize: number;

  @ApiProperty({
    description: 'Indica si el departamento tiene aire acondicionado',
    example: true
  })
  @IsBoolean()
  @IsNotEmpty()
  hasAc: boolean;

  @ApiProperty({
    description: 'Año de construcción del edificio',
    example: 2000
  })
  @IsNumber()
  @IsNotEmpty()
  yearBuilt: number;

  @ApiProperty({
    description: 'Precio de alquiler mensual',
    example: 1200.50
  })
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  rentPrice: number;

  @ApiProperty({
    description: 'Fecha de disponibilidad del departamento',
    example: '2024-03-01'
  })
  @IsDateString()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (!value) return value;
    try {
      return new Date(value).toISOString();
    } catch {
      return value;
    }
  })
  dateAvailable: Date;
}
