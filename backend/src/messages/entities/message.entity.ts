import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Flat } from '../../flats/entities/flat.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @ManyToOne(() => Flat, flat => flat.messages)
  flat: Flat;

  @ManyToOne(() => User, user => user.messages)
  sender: User;

  @CreateDateColumn()
  created: Date;
}
