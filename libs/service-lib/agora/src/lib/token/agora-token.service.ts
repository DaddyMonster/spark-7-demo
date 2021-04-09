import { Injectable } from '@nestjs/common';
import { AgoraTokenGenDto } from './dto/agora-token-gen.dto';
import { RtcRole, RtcTokenBuilder } from 'agora-access-token';
@Injectable()
export class AgoraTokenService {
  async generateToken({ uid, channelName }: AgoraTokenGenDto) {
    try {
      const role = RtcRole.PUBLISHER;
      const appId = process.env.AGORA_APP_ID;
      const certificate = process.env.AGORA_APP_CERTIFICATE;
      // set a expiration time of 1 hour in seconds
      const expireTime = 60 * 10;
      const currentTime = Math.floor(Date.now() / 1000);
      const privilegeExpireTime = currentTime + expireTime;
      const token = RtcTokenBuilder.buildTokenWithUid(
        appId,
        certificate,
        channelName,
        uid,
        role,
        privilegeExpireTime
      );
      console.log('TOKEN', token, appId, certificate);
      return token;
    } catch (err) {
      console.log(err);
      throw new Error('TOKEN NOT INITIATED');
    }
  }
}
