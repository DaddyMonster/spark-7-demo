import { AppSession } from '@hessed/service-lib/exp-session';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LogAppUserSession {
  @Field(() => Int)
  uid: number;

  @Field()
  email: string;

  @Field()
  displayName: string;

  @Field()
  role: string;

  @Field()
  expires: Date;
}

export type LogAppReq = AppSession<{ user: LogAppUserSession }>;
