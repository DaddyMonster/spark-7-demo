import { InternalServerErrorException } from '@nestjs/common';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as argon from 'argon2';
import { LogAppRole } from './log-roles';
import { CommonEntity } from '@hessed/service-module/common';

@ObjectType()
@Entity()
export class LogAppUser extends CommonEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  uid: number;

  @Field(() => ID, { nullable: true })
  @Column({ nullable: true })
  oAuthUid: string;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  password: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  displayName: string;

  @Field(() => LogAppRole)
  @Column({ type: 'enum', enum: LogAppRole })
  role: LogAppRole;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password) {
      try {
        this.password = await argon.hash(this.password);
      } catch (e) {
        console.log(e);
        throw new InternalServerErrorException();
      }
    }
  }
}
