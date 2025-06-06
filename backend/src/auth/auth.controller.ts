import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from '../users/dto/register-user.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-auth.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({
    summary: 'Registrar un nuevo usuario',
    description:
      'Crea un nuevo usuario y devuelve un token JWT para autenticación',
  })
  @ApiBody({
    type: RegisterUserDto,
    description: 'Datos del usuario a registrar',
    examples: {
      example1: {
        value: {
          email: 'usuario@ejemplo.com',
          password: 'password123',
          firstName: 'Juan',
          lastName: 'Pérez',
          birthDate: '1990-01-01',
          isAdmin: false,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Usuario registrado exitosamente',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Error de validación' })
  @ApiResponse({ status: 409, description: 'El email ya está registrado' })
  async register(@Body() registerUserDto: RegisterUserDto) {
    await this.authService.register(registerUserDto);
    const user = await this.authService.validateUser(
      registerUserDto.email,
      registerUserDto.password,
    );
    return this.authService.login(user);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Iniciar sesión de usuario',
    description: 'Autentica al usuario y devuelve un token JWT',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Credenciales de acceso',
    examples: {
      example1: {
        value: {
          email: 'usuario@ejemplo.com',
          password: 'password123',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Login exitoso',
    schema: {
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        },
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto) {
    console.log('Datos recibidos en login:', loginDto);
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
