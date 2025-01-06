import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    Unique,
  } from 'typeorm';

@Entity('GoogleUser')

export class GoogleUserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  picture: string;

  @Column()
  accessToken: string;
}
