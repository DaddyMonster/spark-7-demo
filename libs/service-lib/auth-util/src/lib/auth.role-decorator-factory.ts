import { SetMetadata } from '@nestjs/common';

export function RolesFactory<T extends string>() {
  return (...roles: T[]) => SetMetadata('roles', roles);
}
