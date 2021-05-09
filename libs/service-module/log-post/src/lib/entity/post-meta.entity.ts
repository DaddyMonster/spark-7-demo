import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LogAppUser } from '@hessed/service-module/log-auth';
@ObjectType()
@Entity()
export class LogPostMeta {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => ID)
  @Column()
  contentId: string;

  /* @Field()
  content: PostContent */

  @Field(() => LogAppUser)
  @ManyToOne(() => LogAppUser, (user) => user.uid)
  logAppUser: LogAppUser;
}
