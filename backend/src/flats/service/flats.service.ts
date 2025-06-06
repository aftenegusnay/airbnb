import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flat } from '../entities/flat.entity';
import { User } from '../../users/entities/user.entity';
import { CreateFlatDto } from '../dto/create-flat.dto';
import { UpdateFlatDto } from '../dto/update-flat.dto';

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
      throw new NotFoundException('Usuario no encontrado');
    }

    const flat = this.flatsRepository.create({
      ...createFlatDto,
      owner: user,
    });

    return this.flatsRepository.save(flat);
  }

  async findAll(): Promise<Flat[]> {
    return this.flatsRepository.find({
      relations: ['owner', 'favoritedBy'],
    });
  }

  async findOne(id: string): Promise<Flat> {
    const flat = await this.flatsRepository.findOne({
      where: { id },
      relations: ['owner', 'favoritedBy'],
    });

    if (!flat) {
      throw new NotFoundException('Departamento no encontrado');
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
      throw new NotFoundException('Usuario no encontrado');
    }

    const isFavorited = flat.favoritedBy.some((user) => user.id === userId);

    if (isFavorited) {
      flat.favoritedBy = flat.favoritedBy.filter(
        (user) => user.id !== userId,
      );
    } else {
      flat.favoritedBy.push({ id: userId } as any);
    }

    return this.flatsRepository.save(flat);
  }
}
