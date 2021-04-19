import { AgoraTokenGenDto } from '@hessed/service-lib/agora';
import {
  ClientRole,
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  UID,
  IRemoteAudioTrack,
} from 'agora-rtc-sdk-ng';
import axios from 'axios';

interface ConnectionOptions {
  channelId: string;
  initialRole: ClientRole;
  liveUid: number;
}

interface AgoraConstructor {
  client: IAgoraRTCClient;
  channelId: string;
  liveUid: number;
  initialRole: ClientRole;
  onVolumeUpdate: OnVolumeUpdate;
}

export const fetchToken = async (args: AgoraTokenGenDto) => {
  const { data } = await axios.post('/api/agora-token', args);
  return data;
};

export interface AudIndicator {
  uid: UID;
  level: number;
}
type OnVolumeUpdate = (result: AudIndicator[]) => void;
const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID;

export class Agora {
  private client: IAgoraRTCClient;
  private liveUid: number;
  private channelId: string;
  private localAud: IMicrophoneAudioTrack | null;
  private remoteAud: IRemoteAudioTrack;
  private onVolumeUpdate: OnVolumeUpdate;
  public static async initClient(
    { channelId, initialRole, liveUid }: ConnectionOptions,
    onVolumeUpdate: OnVolumeUpdate
  ) {
    const { default: AgoraRTC } = await import('agora-rtc-sdk-ng');
    const client = AgoraRTC.createClient({ mode: 'live', codec: 'vp8' });
    const body: AgoraTokenGenDto = {
      channelName: channelId,
      uid: liveUid,
    };
    const token = await fetchToken(body);
    await client.join(appId, channelId, token, liveUid);

    return new Agora({
      client,
      liveUid,
      channelId,
      initialRole,
      onVolumeUpdate,
    });
  }

  constructor({
    channelId,
    client,
    liveUid,
    initialRole,
    onVolumeUpdate,
  }: AgoraConstructor) {
    this.channelId = channelId;
    this.client = client;
    this.client.enableAudioVolumeIndicator();
    this.liveUid = liveUid;
    this.onVolumeUpdate = onVolumeUpdate.bind(this);
    this.initConnection(initialRole);
  }

  private initConnection(initRole: ClientRole) {
    this.client.on('user-joined', async (remote) => {
      this.remoteAud = remote.audioTrack;
      await this.client.subscribe(remote, 'audio');
    });
    this.client.on('volume-indicator', this.onVolumeUpdate);
    this.client.on('token-privilege-will-expire', this.resetToken);
    this.switchRole(initRole);
  }

  private async getLocalAud() {
    if (this.localAud) {
      return this.localAud;
    }
    const { default: AgoraRTC } = await import('agora-rtc-sdk-ng');
    const aud = await AgoraRTC.createMicrophoneAudioTrack();
    this.localAud = aud;
    return aud;
  }

  public switchRole(role: ClientRole) {
    if (role === 'host') {
      this.initHost();
    } else {
      this.initAudience();
    }
  }

  public async terminate() {
    await this.client.leave();
    this.localAud.close();
    this.localAud = null;
  }

  public async setVolume(val: number) {
    this.remoteAud.setVolume(val);
  }

  private async initHost() {
    await this.client.setClientRole('host');
    await this.publishAudio();
  }

  private async initAudience() {
    await this.client.unpublish(this.localAud);
    this.localAud.close();
    this.localAud = null;
    await this.client.setClientRole('audience');
  }

  private async resetToken() {
    console.warn('RESETTING TOKEN');
    console.warn('CHANNEL ID : ', this.channelId);
    console.warn('AGORA RAW UID : ', this.liveUid);
    const token = await fetchToken({
      channelName: this.channelId,
      uid: this.liveUid,
    });
    console.warn('RENEWED TOKEN : ', token);
    await this.client.renewToken(token);
  }

  private async publishAudio() {
    const localAudio = await this.getLocalAud();
    await this.client.publish([localAudio]);
  }
}
