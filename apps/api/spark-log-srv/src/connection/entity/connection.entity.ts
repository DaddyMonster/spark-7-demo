import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class ConnectionTest {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  connection: boolean;

  @Field()
  @Column()
  log: string;
}
