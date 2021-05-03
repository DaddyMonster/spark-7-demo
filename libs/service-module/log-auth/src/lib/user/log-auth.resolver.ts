import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { RoleGuard } from '../../../../../service-lib/auth-util/src';
import { Roles } from '../auth/Roles.decorator';
import { LogAppRole } from './entity/log-roles';
import { LogAuthService } from './log-auth.service';

@Resolver()
export class LogAuthResolver {
  constructor(private logAuth_srv: LogAuthService) {}

  @Query(() => String)
  @UseGuards(RoleGuard)
  @Roles(LogAppRole.Lite)
  async test() {
    return 'helo';
  }
}
