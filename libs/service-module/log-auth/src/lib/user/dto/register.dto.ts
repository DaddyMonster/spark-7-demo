import { InputType, PickType } from '@nestjs/graphql';
import { LogAppUser } from '../entity';

@InputType()
export class RegisterDTO extends PickType(LogAppUser, [
  'username',
  'password',
  'email',
  'displayName',
]) {}
