import { Module } from '@nestjs/common';
import { ServiceLibLemmaService } from './service-lib-lemma.service';
import { ServiceLibLemmaController } from './service-lib-lemma.controller';

@Module({
  controllers: [ServiceLibLemmaController],
  providers: [ServiceLibLemmaService],
  exports: [ServiceLibLemmaService],
})
export class ServiceLibLemmaModule {}
