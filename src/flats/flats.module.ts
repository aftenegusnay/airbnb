import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlatsService } from '../services/flats.service';
import { Flat } from './entities/flat.entity';
import { User } from '../users/entities/user.entity';
import { FlatsController } from './flats.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Flat, User])],
  controllers: [FlatsController],
  providers: [FlatsService],
  exports: [FlatsService],
})
export class FlatsModule {}
