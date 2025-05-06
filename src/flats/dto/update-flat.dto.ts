import { IsString, IsNumber, IsBoolean, IsDate, Min, IsOptional } from 'class-validator';

export class UpdateFlatDto {
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  streetName?: string;

  @IsOptional()
  @IsNumber()
  streetNumber?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  areaSize?: number;

  @IsOptional()
  @IsBoolean()
  hasAc?: boolean;

  @IsOptional()
  @IsNumber()
  yearBuilt?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  rentPrice?: number;

  @IsOptional()
  @IsDate()
  dateAvailable?: Date;
}
