import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { CreateMessageDto } from '../dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  async create(
    flatId: string,
    createMessageDto: CreateMessageDto,
    senderId: string,
  ): Promise<Message> {
    const message = this.messagesRepository.create({
      ...createMessageDto,
      sender: { id: senderId },
      flat: { id: flatId },
    });
    return this.messagesRepository.save(message);
  }

  async findAllByFlat(flatId: string): Promise<Message[]> {
    return this.messagesRepository.find({
      where: { flat: { id: flatId } },
      relations: ['sender', 'flat'],
      order: { created: 'DESC' },
    });
  }

  async findBySender(flatId: string, senderId: string): Promise<Message[]> {
    return this.messagesRepository.find({
      where: {
        flat: { id: flatId },
        sender: { id: senderId },
      },
      relations: ['sender', 'flat'],
      order: { created: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Message> {
    const message = await this.messagesRepository.findOne({
      where: { id },
      relations: ['sender', 'flat'],
    });
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }

  async remove(id: string, senderId: string): Promise<void> {
    const message = await this.findOne(id);
    if (message.sender.id !== senderId) {
      throw new NotFoundException(
        'You are not authorized to delete this message',
      );
    }
    await this.messagesRepository.remove(message);
  }
}
