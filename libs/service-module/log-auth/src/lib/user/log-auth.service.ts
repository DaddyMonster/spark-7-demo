import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon from 'argon2';
import { Repository } from 'typeorm';
import { LogAppReq, LogAppUserSession } from '../auth/app-request.type';
import { AuthResponseMsg } from './constant/auth-response-msg';
import { AuthErrorReason, AuthResponseDAO } from './dao';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { LogAppUser } from './entity';

@Injectable({ scope: Scope.REQUEST })
export class LogAuthService {
  constructor(
    @InjectRepository(LogAppUser) private user_srv: Repository<LogAppUser>,
    @Inject(REQUEST) private req: LogAppReq
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
    username,
  }: RegisterDTO): Promise<AuthResponseDAO> {
    const exist = this.user_srv.findOne({ where: { email } });
    if (exist) return this.buildAuthError(AuthErrorReason.Email_Exist);

    const user = await this.user_srv.save({
      email,
      displayName,
      password,
      username,
    });

    this.registerUserSession(user);
    return { user };
  }

  public async logout(): Promise<boolean> {
    if (!this.req.session.user) {
      throw new BadRequestException();
    }
    await this.terminateUserSession();
    return true;
  }

  public checkUser(): LogAppUserSession | null {
    return this.req.session.user;
  }

  public async me(): Promise<AuthResponseDAO> {
    const { user } = this.req.session;
    this.req.session.cookie.expires;
    if (!user) return this.buildAuthError(AuthErrorReason.Not_Auth);
    const { uid } = user;
    return { user: await this.user_srv.findOneOrFail(uid) };
  }

  private registerUserSession(user: LogAppUser) {
    const { uid, username, email, role } = user;
    this.req.session.user = {
      email,
      username,
      uid,
      role,
      expire: this.req.session.cookie.expires,
    };
  }

  private async terminateUserSession() {
    this.req.session.destroy((err) => console.log(err));
    this.req.session.user = null;
  }

  private buildAuthError(reason: AuthErrorReason): AuthResponseDAO {
    return {
      user: null,
      error: { reason, message: AuthResponseMsg[reason] },
    };
  }
}
