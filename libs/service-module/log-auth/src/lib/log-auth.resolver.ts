import { Resolver } from '@nestjs/graphql';
import { LogAuthService } from './log-auth.service';

@Resolver()
export class LogAuthResolver {
  constructor(private logAuth_srv: LogAuthService) {}
}
