import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({
    description: 'Contenido del mensaje',
    example: '¿El departamento sigue disponible?'
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
