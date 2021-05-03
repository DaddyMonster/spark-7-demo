import { registerEnumType } from '@nestjs/graphql';

export enum LogAppRole {
  Admin = 'Admin',
  Power = 'Power',
  Lite = 'Lite',
}

registerEnumType(LogAppRole, { name: 'LogAppRole' });
