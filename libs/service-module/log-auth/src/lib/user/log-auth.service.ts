import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CONTEXT } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { LogAppReq, LogAppUserSession } from '../auth/app-request.type';
import { AuthResponseMsg } from './constant/auth-response-msg';
import { AuthErrorReason, AuthResponseDAO } from './dao';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { LogAppRole, LogAppUser } from './entity';

@Injectable({ scope: Scope.REQUEST })
export class LogAuthService {
  constructor(
    @InjectRepository(LogAppUser) private user_srv: Repository<LogAppUser>,
    @Inject(CONTEXT) private ctx: LogAppReq
  ) {}

  public async login({ email, password }: LoginDTO): Promise<AuthResponseDAO> {
    const user = await this.user_srv.findOne({ where: { email } });
    if (!user) return this.buildAuthError(AuthErrorReason.No_User);

    const valid = argon.verify(user.password, password);
    if (!valid) return this.buildAuthError(AuthErrorReason.Wrong_Pass);

    this.registerUserSession(user);
    return { user };
  }

  public async register({
    displayName,
    email,
    password,
    role = LogAppRole.Lite,
  }: RegisterDTO): Promise<AuthResponseDAO> {
    /* console.log(this.ctx); */
    console.log(this.ctx)

    const exist = await this.user_srv.findOne({ where: { email } });

    if (exist) return this.buildAuthError(AuthErrorReason.Email_Exist);

    const user = await this.user_srv.save({
      email,
      displayName,
      password,
      role,
    });

    this.registerUserSession(user);
    return { user };
  }

  public async logout(): Promise<boolean> {
    if (!this.ctx.session.user) {
      throw new BadRequestException();
    }
    await this.terminateUserSession();
    return true;
  }

  public checkUser(): LogAppUserSession | null {
    return this.ctx.session.user;
  }

  public async me(): Promise<AuthResponseDAO> {
    const { user } = this.ctx.session;
    this.ctx.session.cookie.expires;
    if (!user) return this.buildAuthError(AuthErrorReason.Not_Auth);
    const { uid } = user;
    return { user: await this.user_srv.findOneOrFail(uid) };
  }

  private registerUserSession(user: LogAppUser) {
    console.log(this.ctx);
    const { uid, email, role, displayName } = user;
    const { expires } = this.ctx.session.cookie;
    this.ctx.session.user = {
      displayName,
      email,
      uid,
      role,
      expires,
    };
  }

  private async terminateUserSession() {
    this.ctx.session.destroy((err) => console.log(err));
    this.ctx.session.user = null;
  }

  private buildAuthError(reason: AuthErrorReason): AuthResponseDAO {
    return {
      user: null,
      error: { reason, message: AuthResponseMsg[reason] },
    };
  }
}
