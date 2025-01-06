import {
    Entity,
    Column,
    BaseEntity,
    Unique,
    Check,
    PrimaryColumn,
    ManyToOne,
    OneToMany,
    RelationId,
  } from 'typeorm';

import { ServiceEntity } from './service.entity';
import { AreaEntity } from './area.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Reaction')
@Unique(['description'])
@Check(`"description" != ''`)
export class ReactionEntity extends BaseEntity {
  @PrimaryColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @OneToMany(() => AreaEntity, (area) => area.id)
  areas: AreaEntity[];

  @Column()
  @ApiProperty()
  description: string;

  @ManyToOne(() => ServiceEntity, (service) => service.id)
  service: ServiceEntity;

  @RelationId((reaction: ReactionEntity) => reaction.service)
  serviceId: number;

  @Column()
  @ApiProperty()
  nbr_args: number;

  @Column({ type: 'jsonb' })
  @ApiProperty()
  args_reaction: Object;
}
