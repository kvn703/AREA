import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Unique,
  Check,
  OneToMany,
  JoinColumn,
} from 'typeorm';

import { ActionEntity } from './action.entity';
import { ReactionEntity } from './reaction.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Service')
@Unique(['name'])
@Check(`"name" != '' AND "description" != ''`)
export class ServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @Column()
  @ApiProperty()
  logo_url: string;

  @OneToMany(() => ActionEntity, (action) => action.service)
  actions: ActionEntity[];

  @OneToMany(() => ReactionEntity, (reaction) => reaction.service)
  reactions: ReactionEntity[];
}
