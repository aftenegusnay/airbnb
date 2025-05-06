import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flat } from '../flats/entities/flat.entity';
import { CreateFlatDto } from '../flats/dto/create-flat.dto';
import { UpdateFlatDto } from '../flats/dto/update-flat.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class FlatsService {
  constructor(
    @InjectRepository(Flat)
    private flatsRepository: Repository<Flat>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createFlatDto: CreateFlatDto, userId: string): Promise<Flat> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    const flat = this.flatsRepository.create({
      ...createFlatDto,
      owner: user,
    });
    return this.flatsRepository.save(flat);
  }

  async findAll(): Promise<Flat[]> {
    return this.flatsRepository.find({
      relations: ['owner'],
    });
  }

  async findOne(id: string): Promise<Flat> {
    const flat = await this.flatsRepository.findOne({
      where: { id },
      relations: ['owner'],
    });
    if (!flat) {
      throw new NotFoundException(`Departamento con ID ${id} no encontrado`);
    }
    return flat;
  }

  async update(id: string, updateFlatDto: UpdateFlatDto, userId: string): Promise<Flat> {
    const flat = await this.findOne(id);
    
    if (flat.owner.id !== userId) {
      throw new UnauthorizedException('No tienes permiso para actualizar este departamento');
    }
    
    Object.assign(flat, updateFlatDto);
    return this.flatsRepository.save(flat);
  }

  async remove(id: string, userId: string): Promise<void> {
    const flat = await this.findOne(id);
    
    if (flat.owner.id !== userId) {
      throw new UnauthorizedException('No tienes permiso para eliminar este departamento');
    }
    
    await this.flatsRepository.remove(flat);
  }

  async toggleFavorite(id: string, userId: string): Promise<Flat> {
    const flat = await this.findOne(id);
    const user = await this.usersRepository.findOne({
      where: { id: userId },
      relations: ['favorites'],
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    const isFavorite = user.favorites.some(favorite => favorite.id === flat.id);
    
    if (isFavorite) {
      user.favorites = user.favorites.filter(favorite => favorite.id !== flat.id);
    } else {
      user.favorites.push(flat);
    }

    await this.usersRepository.save(user);
    return flat;
  }
} 