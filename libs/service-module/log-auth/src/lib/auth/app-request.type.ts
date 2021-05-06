import { AppSession } from '@hessed/service-lib/exp-session';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogAppUserSession {
  @Field(() => Int)
  uid: number;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  role: string;

  @Field()
  expire: Date;
}

export type LogAppReq = AppSession<{ user: LogAppUserSession }>;
