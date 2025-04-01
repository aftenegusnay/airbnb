import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity'; // Asegúrate de importar la entidad correcta

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // O cambia a 'mysql', 'mariadb', etc.
      host: 'bkwljfugeifqquhtliiu.supabase.co',
      port: 5432, // Puerto por defecto de PostgreSQL
      username: 'aftenegusnay',
      password: 'airbnbcloneelian',
      database: 'airbnb',
      entities: [User], // Incluye aquí todas tus entidades
      synchronize: true, // Solo en desarrollo, en producción usa migrations
      logging: true, // Para ver las consultas en consola
    }),
    UsersModule,
  ],
})
export class AppModule {}
