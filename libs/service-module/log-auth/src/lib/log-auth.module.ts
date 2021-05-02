import { Module } from '@nestjs/common';
import { LogAuthService } from './log-auth.service';

@Module({
  controllers: [],
  providers: [LogAuthService],
})
export class ServiceModuleLogAuthModule {}
