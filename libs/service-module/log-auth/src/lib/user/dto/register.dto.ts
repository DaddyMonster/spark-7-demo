import { InputType, PickType } from '@nestjs/graphql';
import { LogAppRole, LogAppUser } from '../entity';

@InputType()
export class RegisterDTO extends PickType(
  LogAppUser,
  ['password', 'email', 'displayName'],
  InputType
) {
  role?: LogAppRole;
}
