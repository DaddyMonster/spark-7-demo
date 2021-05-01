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
  console.log('TOKEN', data);
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
    this.client = client;
    this.client.enableAudioVolumeIndicator();
    this.onVolumeUpdate = onVolumeUpdate.bind(this);
    this.initConnection(initialRole, channelId, liveUid);
  }

  private async initConnection(
    initRole: ClientRole,
    channelId: string,
    liveUid: number
  ) {
    this.client.on('user-unpublished', async (remote) => {
      await this.client.unsubscribe(remote, 'audio');
    });
    this.client.on('volume-indicator', this.onVolumeUpdate);
    this.client.on('token-privilege-will-expire', () =>
      this.resetToken(channelId, liveUid)
    );
    this.client.on('user-published', async (remote, mediaType) => {
      await this.client.subscribe(remote, mediaType);
      this.remoteAud = remote?.audioTrack ?? null;
      this.remoteAud?.play();
      this.remoteAud.setVolume(100);
    });
    await this.client.setClientRole(initRole);

    if (initRole === 'host') {
      await this.initHost();
    } else {
      await this.initAudience();
    }
  }

  private async initHost() {
    /* this.client.on('user-published', (users) => {
      this.client.subscribe(users, 'audio');
      users.audioTrack?.play();
      this.localAud?.play();
    }); */
    const localAudio = await this.getLocalAud();
    await this.client.publish(localAudio);
  }

  private async initAudience() {
    this.client.on('user-published', async (remote) => {
      this.remoteAud = remote.audioTrack;
      await this.client.subscribe(remote, 'audio');
      remote.audioTrack.play();
    });
  }

  private async getLocalAud() {
    if (this.localAud) {
      return this.localAud;
    }
    const { default: AgoraRTC } = await import('agora-rtc-sdk-ng');
    const aud = await AgoraRTC.createMicrophoneAudioTrack();
    this.localAud = aud;
    this.localAud.play();
    return aud;
  }

  public getVol() {
    return this.localAud.getVolumeLevel();
  }

  public isPlaying() {
    return {
      localAud: this.localAud.isPlaying,
      remoteAud: this.remoteAud?.isPlaying,
    };
  }

  public async switchRole(role: ClientRole) {
    await this.client.setClientRole(role);
  }

  public async terminate() {
    await this.client.leave();
    this.localAud?.close();
    this.localAud?.getMediaStreamTrack().stop();
    this.localAud = null;
  }

  public async setVolume(val: number) {
    this.remoteAud.setVolume(val);
  }

  private async resetToken(channelName: string, liveUid: number) {
    console.warn('RESETTING TOKEN');
    console.warn('CHANNEL ID : ', channelName);
    console.warn('AGORA RAW UID : ', liveUid);
    const token = await fetchToken({
      channelName,
      uid: liveUid,
    });
    console.warn('RENEWED TOKEN : ', token);
    await this.client.renewToken(token);
  }
}
