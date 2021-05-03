import { AuthUserDecoratorFactory } from '@hessed/service-lib/auth-util';
import { LogAppRole } from '../user/entity/log-roles';
import { LogAppUser } from '../user/entity/logapp-user.entity';
export const User = AuthUserDecoratorFactory<LogAppRole, LogAppUser>();
