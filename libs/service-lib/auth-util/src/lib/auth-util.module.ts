import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './role.guard';

@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AuthUtilModule {}
