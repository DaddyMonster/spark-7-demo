import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { RoleForGuard } from './auth.role-decorator-factory';
import { CustomCtx } from './ctx.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate<R extends string>(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const gqlContext = ctx.getContext<CustomCtx<R>>();
    const roles = this.reflector.get<RoleForGuard<R>[]>(
      'roles',
      ctx.getHandler()
    );
    const user = gqlContext.user;

    if (roles.includes('NONE_USER')) return Boolean(!user);

    if (!user) return false;

    if (!roles) return true;

    return roles.includes(user?.role);
  }
}
