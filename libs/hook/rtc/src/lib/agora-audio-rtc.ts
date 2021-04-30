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
  token: string;
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

    return new Agora({
      client,
      liveUid,
      channelId,
      initialRole,
      onVolumeUpdate,
      token,
    });
  }

  constructor({
    channelId,
    client,
    liveUid,
    initialRole,
    onVolumeUpdate,
    token,
  }: AgoraConstructor) {
    this.client = client;
    this.client.enableAudioVolumeIndicator();
    this.onVolumeUpdate = onVolumeUpdate.bind(this);
    this.initConnection(initialRole, channelId, liveUid, token);
  }

  private async initConnection(
    initRole: ClientRole,
    channelId: string,
    liveUid: number,
    token: string
  ) {
    this.client.on('user-published', async (remote) => {
      this.remoteAud = remote.audioTrack;
      await this.client.subscribe(remote, 'audio');
    });
    this.client.on('user-unpublished', async (remote) => {
      await this.client.unsubscribe(remote, 'audio');
    });
    this.client.on('volume-indicator', this.onVolumeUpdate);
    this.client.on('token-privilege-will-expire', () =>
      this.resetToken(channelId, liveUid)
    );
    await this.client.setClientRole(initRole);
    await this.client.join(appId, channelId, token, liveUid);
    await this.publishAudio();
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

  private async publishAudio() {
    const localAudio = await this.getLocalAud();
    await this.client.publish(localAudio);
  }
}
