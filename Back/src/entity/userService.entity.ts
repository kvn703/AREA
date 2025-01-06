import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Check,
  ManyToOne,
  Unique,
  Index,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { ServiceEntity } from './service.entity';

@Entity('User_Service')
@Unique(['user', 'service'])
@Index(['user', 'service'])
@Check(`"token" != ''`)
export class UserServiceEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;

  @RelationId((userService: UserServiceEntity) => userService.user)
  userId: number;

  @ManyToOne(() => ServiceEntity, (service) => service.id)
  @JoinColumn()
  service: ServiceEntity;

  @RelationId((userService: UserServiceEntity) => userService.service)
  serviceId: number;

  @Column()
  serviceIdentifier: string;

  @Column()
  token: string;
}
