import { Module } from '@nestjs/common';
import { AgoraTokenController } from './agora-token.controller';
import { AgoraTokenService } from './agora-token.service';

@Module({
  controllers: [AgoraTokenController],
  providers: [AgoraTokenService],
  exports: [],
})
export class ServiceLibAgoraModule {}
