import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Message } from '../../messages/entities/message.entity';

@Entity('flats')
export class Flat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  city: string;

  @Column()
  streetName: string;

  @Column()
  streetNumber: number;

  @Column()
  areaSize: number;

  @Column({ default: false })
  hasAc: boolean;

  @Column()
  yearBuilt: number;

  @Column('decimal', { precision: 10, scale: 2 })
  rentPrice: number;

  @Column()
  dateAvailable: Date;

  @ManyToOne(() => User, user => user.flats)
  owner: User;

  @OneToMany(() => Message, message => message.flat)
  messages: Message[];

  @ManyToMany(() => User, user => user.favouriteFlats)
  favouritedBy: User[];

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
