import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { Field } from '@nestjs/graphql';
@Entity()
export class CommonEntity {
  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
