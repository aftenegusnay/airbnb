import { IsEmail, IsString, IsBoolean, MinLength, IsOptional, IsDateString } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

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
  birthDate?: Date;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' ? true : value === 'false' ? false : value)
  isAdmin?: boolean;
}
