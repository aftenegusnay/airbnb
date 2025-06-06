import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { FlatsService } from '../services/flats.service';
import { CreateFlatDto } from './dto/create-flat.dto';
import { UpdateFlatDto } from './dto/update-flat.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('flats')
@ApiBearerAuth()
@Controller('flats')
@UseGuards(JwtAuthGuard, RolesGuard)
export class FlatsController {
  constructor(private readonly flatsService: FlatsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Crear un nuevo departamento' })
  @ApiResponse({ status: 201, description: 'Departamento creado exitosamente' })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  create(@Body() createFlatDto: CreateFlatDto, @Request() req) {
    return this.flatsService.create(createFlatDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los departamentos' })
  @ApiResponse({
    status: 200,
    description: 'Lista de departamentos obtenida exitosamente',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  findAll() {
    return this.flatsService.findAll();
  }

  @Get('favorites')
  @ApiOperation({ summary: 'Obtener departamentos favoritos del usuario' })
  @ApiResponse({ 
    status: 200, 
    description: 'Lista de departamentos favoritos obtenida exitosamente',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          city: { type: 'string' },
          streetName: { type: 'string' },
          streetNumber: { type: 'number' },
          areaSize: { type: 'number' },
          hasAc: { type: 'boolean' },
          yearBuilt: { type: 'number' },
          rentPrice: { type: 'number' },
          dateAvailable: { type: 'string', format: 'date' },
          owner: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              email: { type: 'string' },
              firstName: { type: 'string' },
              lastName: { type: 'string' }
            }
          }
        }
      }
    }
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  getFavorites(@Request() req) {
    return this.flatsService.getUserFavorites(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un departamento por ID' })
  @ApiResponse({
    status: 200,
    description: 'Departamento encontrado exitosamente',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Departamento no encontrado' })
  findOne(@Param('id') id: string) {
    return this.flatsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Actualizar un departamento' })
  @ApiResponse({
    status: 200,
    description: 'Departamento actualizado exitosamente',
  })
  @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  @ApiResponse({ status: 404, description: 'Departamento no encontrado' })
  update(
    @Param('id') id: string,
    @Body() updateFlatDto: UpdateFlatDto,
    @Request() req,
  ) {
    return this.flatsService.update(id, updateFlatDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Eliminar un departamento' })
  @ApiResponse({
    status: 200,
    description: 'Departamento eliminado exitosamente',
  })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 403, description: 'Acceso denegado' })
  @ApiResponse({ status: 404, description: 'Departamento no encontrado' })
  remove(@Param('id') id: string, @Request() req) {
    return this.flatsService.remove(id, req.user.id);
  }

  @Post(':id/favorite')
  @ApiOperation({ summary: 'Agregar/quitar departamento de favoritos' })
  @ApiResponse({ status: 200, description: 'Operación realizada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  @ApiResponse({ status: 404, description: 'Departamento no encontrado' })
  toggleFavorite(@Param('id') id: string, @Request() req) {
    return this.flatsService.toggleFavorite(id, req.user.id);
  }
}
