import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MessagesService } from '../services/messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('messages')
@ApiBearerAuth()
@Controller('flats/:id/messages')
@UseGuards(JwtAuthGuard)
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo mensaje' })
  @ApiResponse({ status: 201, description: 'Mensaje creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Departamento no encontrado' })
  create(
    @Param('id') flatId: string,
    @Body() createMessageDto: CreateMessageDto,
    @Request() req,
  ) {
    return this.messagesService.create(flatId, createMessageDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los mensajes de un departamento' })
  @ApiResponse({
    status: 200,
    description: 'Lista de mensajes obtenida exitosamente',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Departamento no encontrado' })
  findAll(@Param('id') flatId: string) {
    return this.messagesService.findAll(flatId);
  }

  @Get('sender/:senderId')
  @ApiOperation({ summary: 'Obtener mensajes por remitente' })
  @ApiResponse({ status: 200, description: 'Lista de mensajes obtenida exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Departamento o remitente no encontrado' })
  findBySender(
    @Param('id') flatId: string,
    @Param('senderId') senderId: string,
  ) {
    return this.messagesService.findBySender(flatId, senderId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.messagesService.remove(id, req.user.id);
  }
}
