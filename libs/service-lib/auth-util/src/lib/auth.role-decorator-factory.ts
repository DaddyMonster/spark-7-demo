import { SetMetadata } from '@nestjs/common';

export type RoleForGuard<T extends string> = T | 'NONE_USER';

export function RolesFactory<T extends string>() {
  return (...roles: RoleForGuard<T>[]) => SetMetadata('roles', roles);
}
