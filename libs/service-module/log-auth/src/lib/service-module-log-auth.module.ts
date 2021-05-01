import { Module } from '@nestjs/common';
import { ServiceModuleLogAuthService } from './service-module-log-auth.service';

@Module({
  controllers: [],
  providers: [ServiceModuleLogAuthService],
  exports: [ServiceModuleLogAuthService],
})
export class ServiceModuleLogAuthModule {}
