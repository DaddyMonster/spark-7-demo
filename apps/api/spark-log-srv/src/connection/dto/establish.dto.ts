import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class EstablishConnectionDTO {
  @Field()
  log: string;
}
