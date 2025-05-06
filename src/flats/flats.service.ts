import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flat } from './entities/flat.entity';
import { CreateFlatDto } from './dto/create-flat.dto';
import { UpdateFlatDto } from './dto/update-flat.dto';

@Injectable()
export class FlatsService {
  constructor(
    @InjectRepository(Flat)
    private flatsRepository: Repository<Flat>,
  ) {}

  async create(createFlatDto: CreateFlatDto, ownerId: string): Promise<Flat> {
    const flat = this.flatsRepository.create({
      ...createFlatDto,
      owner: { id: ownerId },
    });
    return this.flatsRepository.save(flat);
  }

  async findAll(): Promise<Flat[]> {
    return this.flatsRepository.find({
      relations: ['owner', 'favouritedBy'],
    });
  }

  async findOne(id: string): Promise<Flat> {
    const flat = await this.flatsRepository.findOne({
      where: { id },
      relations: ['owner', 'favouritedBy', 'messages'],
    });
    if (!flat) {
      throw new NotFoundException(`Flat with ID ${id} not found`);
    }
    return flat;
  }

  async update(id: string, updateFlatDto: UpdateFlatDto, ownerId: string): Promise<Flat> {
    const flat = await this.findOne(id);
    if (flat.owner.id !== ownerId) {
      throw new NotFoundException('You are not authorized to update this flat');
    }
    Object.assign(flat, updateFlatDto);
    return this.flatsRepository.save(flat);
  }

  async remove(id: string, ownerId: string): Promise<void> {
    const flat = await this.findOne(id);
    if (flat.owner.id !== ownerId) {
      throw new NotFoundException('You are not authorized to delete this flat');
    }
    await this.flatsRepository.remove(flat);
  }

  async toggleFavorite(flatId: string, userId: string): Promise<Flat> {
    const flat = await this.findOne(flatId);
    const isFavorited = flat.favouritedBy.some(user => user.id === userId);
    
    if (isFavorited) {
      flat.favouritedBy = flat.favouritedBy.filter(user => user.id !== userId);
    } else {
      flat.favouritedBy.push({ id: userId } as any);
    }
    
    return this.flatsRepository.save(flat);
  }
}
