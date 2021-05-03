import { Field } from '@nestjs/graphql';
import { LogAppUser } from '../entity';
import { AuthError } from './auth.error';

export class AuthResponseDAO {
  @Field(() => LogAppUser, { nullable: true })
  user?: LogAppUser;

  @Field(() => AuthError, { nullable: true })
  error?: AuthError;
}
