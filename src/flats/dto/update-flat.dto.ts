import { IsString, IsNumber, IsBoolean, IsDateString, Min, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

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
  @IsDateString()
  @Transform(({ value }) => {
    if (!value) return value;
    try {
      return new Date(value).toISOString();
    } catch {
      return value;
    }
  })
  dateAvailable?: Date;
}
