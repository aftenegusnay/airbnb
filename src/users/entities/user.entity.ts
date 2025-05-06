import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Flat } from '../../flats/entities/flat.entity';
import { Message } from '../../messages/entities/message.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  birthDate: Date;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Flat, flat => flat.owner)
  flats: Flat[];

  @OneToMany(() => Message, message => message.sender)
  messages: Message[];

  @ManyToMany(() => Flat)
  @JoinTable({
    name: 'user_favourites',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'flatId', referencedColumnName: 'id' }
  })
  favouriteFlats: Flat[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
