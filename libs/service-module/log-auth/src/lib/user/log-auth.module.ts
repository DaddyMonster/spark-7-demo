import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogAppUser } from './entity';
import { LogAuthResolver } from './log-auth.resolver';
import { LogAuthService } from './log-auth.service';

@Module({
  controllers: [],
  imports: [TypeOrmModule.forFeature([LogAppUser])],
  providers: [LogAuthService, LogAuthResolver],
})
export class LogAuthModule {}
