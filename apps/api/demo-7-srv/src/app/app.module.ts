import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceLibAgoraModule } from '@hessed/service-lib/agora';

@Module({
  imports: [ServiceLibAgoraModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
