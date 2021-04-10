import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceLibAgoraModule } from '@hessed/service-lib/agora';
import { ServiceLibTranslatorModule } from '@hessed/service-lib/translator';
@Module({
  imports: [ServiceLibAgoraModule, ServiceLibTranslatorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
