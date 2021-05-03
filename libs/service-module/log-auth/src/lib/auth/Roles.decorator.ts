import { RolesFactory } from '@hessed/service-lib/auth-util';
import { LogAppRole } from '../user/entity/log-roles';
export const Roles = RolesFactory<LogAppRole>();
