import { Module } from '@nestjs/common';
import { ServiceLibTranslatorService } from './service-lib-translator.service';
import { ServiceLibTranslatorController } from './service-lib-translator.controller';

@Module({
  controllers: [ServiceLibTranslatorController],
  providers: [ServiceLibTranslatorService],
  exports: [ServiceLibTranslatorService],
})
export class ServiceLibTranslatorModule {}
