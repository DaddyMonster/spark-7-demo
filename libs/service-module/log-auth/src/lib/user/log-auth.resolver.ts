import { RoleGuard } from '@hessed/service-lib/auth-util';
import { Logger, Req, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { LogAppReq, LogAppUserSession } from '../auth/app-request.type';
import { Roles } from '../auth/Roles.decorator';
import { AuthResponseDAO } from './dao';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { LogAuthService } from './log-auth.service';

@Resolver()
export class LogAuthResolver {
  private readonly logger = new Logger(LogAuthResolver.name);
  constructor(private readonly logAuth_srv: LogAuthService) {}

  @Mutation(() => AuthResponseDAO)
  @UseGuards(RoleGuard)
  @Roles('NONE_USER')
  async login(@Args('login_args') args: LoginDTO): Promise<AuthResponseDAO> {
    const response = await this.logAuth_srv['login'](args);
    this.logger.log(
      response.error
        ? `Error while logging user in ${response.error.message}`
        : `User ${response.user.displayName} has successfully logged in`
    );
    // Staticstic Gathering Here
    return response;
  }

  @UseGuards(RoleGuard)
  @Roles('NONE_USER')
  @Mutation(() => AuthResponseDAO)
  async register(
    @Args('register_args') args: RegisterDTO
  ): Promise<AuthResponseDAO> {
    const response = await this.logAuth_srv['register'](args);
    this.logger.log(
      response.error
        ? `Error while registering user : ${args.email} with ${response.error.message}`
        : `User ${response.user.email} has successfully registered`
    );
    // Staticstic Gathering Here
    return response;
  }

  @Mutation(() => Boolean)
  @UseGuards(RoleGuard)
  async logout(@Req() req: LogAppReq): Promise<boolean> {
    this.logger.log(`User ${req.session.user.email} Logging out`);
    return this.logAuth_srv.logout();
  }

  @Query(() => AuthResponseDAO)
  async me() {
    return this.logAuth_srv.me();
  }

  @Query(() => LogAppUserSession, { nullable: true })
  async checkUser() {
    return this.logAuth_srv.checkUser();
  }
}
