import {
    Entity,
    Column,
    BaseEntity,
    Unique,
    Check,
    PrimaryColumn,
    OneToOne,
    ManyToOne,
    OneToMany,
    RelationId,
  } from 'typeorm';

import { ServiceEntity } from './service.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('Action')
@Unique(['description'])
@Check(`"description" != ''`)
export class ActionEntity extends BaseEntity {
  @PrimaryColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  description: string;

  @ManyToOne(() => ServiceEntity, (service) => service.id)
  service: ServiceEntity;

  @RelationId((action: ActionEntity) => action.service)
  serviceId: number;

  @Column()
  @ApiProperty()
  nbr_args: number;

  @Column({ type: 'jsonb' })
  @ApiProperty()
  args_action: Object;
}
