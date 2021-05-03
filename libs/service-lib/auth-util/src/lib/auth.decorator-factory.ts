import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { CustomCtx, IBaseUser } from './ctx.interface';

export function AuthUserDecoratorFactory<
  R extends string,
  T extends IBaseUser<R>
>() {
  return createParamDecorator(
    (data: unknown, context: ExecutionContext): T | null => {
      const gqlContext = GqlExecutionContext.create(context).getContext<
        CustomCtx<R, T>
      >();
      const user = gqlContext['user'];

      if (!user) {
        return null;
      }
      return user;
    }
  );
}
