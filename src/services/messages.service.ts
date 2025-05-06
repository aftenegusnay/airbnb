import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../messages/entities/message.entity';
import { CreateMessageDto } from '../messages/dto/create-message.dto';
import { Flat } from '../flats/entities/flat.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
    @InjectRepository(Flat)
    private flatsRepository: Repository<Flat>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(flatId: string, createMessageDto: CreateMessageDto, userId: string): Promise<Message> {
    const flat = await this.flatsRepository.findOne({ where: { id: flatId } });
    if (!flat) {
      throw new NotFoundException(`Departamento con ID ${flatId} no encontrado`);
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${userId} no encontrado`);
    }

    const message = this.messagesRepository.create({
      ...createMessageDto,
      flat,
      sender: user,
    });

    return this.messagesRepository.save(message);
  }

  async findAll(flatId: string): Promise<Message[]> {
    const flat = await this.flatsRepository.findOne({ where: { id: flatId } });
    if (!flat) {
      throw new NotFoundException(`Departamento con ID ${flatId} no encontrado`);
    }

    return this.messagesRepository.find({
      where: { flat: { id: flatId } },
      relations: ['sender', 'flat'],
      order: { created: 'DESC' },
    });
  }

  async findBySender(flatId: string, senderId: string): Promise<Message[]> {
    const flat = await this.flatsRepository.findOne({ where: { id: flatId } });
    if (!flat) {
      throw new NotFoundException(`Departamento con ID ${flatId} no encontrado`);
    }

    const sender = await this.usersRepository.findOne({ where: { id: senderId } });
    if (!sender) {
      throw new NotFoundException(`Usuario con ID ${senderId} no encontrado`);
    }

    return this.messagesRepository.find({
      where: {
        flat: { id: flatId },
        sender: { id: senderId },
      },
      relations: ['sender', 'flat'],
      order: { created: 'DESC' },
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    const message = await this.messagesRepository.findOne({
      where: { id },
      relations: ['sender'],
    });

    if (!message) {
      throw new NotFoundException(`Mensaje con ID ${id} no encontrado`);
    }

    if (message.sender.id !== userId) {
      throw new UnauthorizedException('No tienes permiso para eliminar este mensaje');
    }

    await this.messagesRepository.remove(message);
  }
} 