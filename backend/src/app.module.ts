import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { FlatsModule } from './flats/flats.module';
import { AuthModule } from './auth/auth.module';
import { MessagesModule } from './messages/messages.module';
import { Flat } from './flats/entities/flat.entity';
import { Message } from './messages/entities/message.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-0-us-west-1.pooler.supabase.com',
      port: 5432,
      username: 'postgres.wwwanszaadvicyfkudaj',
      password: 'Pigo0173!',
      database: 'postgres',
      synchronize: true,
      logging: true,
      ssl: {
        rejectUnauthorized: false,
      },
      entities: [User, Flat, Message],
    }),

    UsersModule,

    FlatsModule,

    AuthModule,

    MessagesModule,
  ],
})
export class AppModule {}
