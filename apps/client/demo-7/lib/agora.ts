import {
  IAgoraRTCClient,
  IMicrophoneAudioTrack,
  UID,
  IRemoteAudioTrack,
  ClientRole,
} from 'agora-rtc-sdk-ng';
import { AgoraTokenGenDto } from '@hessed/service-lib/agora';
import axios from 'axios';

interface RTC {
  client: IAgoraRTCClient;
  localAud: IMicrophoneAudioTrack;
}
interface ConnectionOptions {
  channelId: string;
  initialRole: ClientRole;
  liveUid: number;
}

export interface AudIndicator {
  uid: UID;
  level: number;
}

type OnVolumeUpdate = (result: AudIndicator[]) => void;

interface AgoraConstructor {
  rtc: RTC;
  agoraClientUid: UID;
  channelId: string;
  agoraClientRawUid: number;
  token: string;
  initialRole: ClientRole;
  onVolumeUpdate: OnVolumeUpdate;
}
const appId = process.env.NEXT_PUBLIC_AGORA_APP_ID;

export const fetchToken = async (args: AgoraTokenGenDto) => {
  const { data } = await axios.post('/api/agora-token', args);
  return data;
};

export class Agora {
  private rtc: RTC;
  private _channelId: string;
  private _agoraClientUid: UID;
  private _remoteAud: IRemoteAudioTrack;
  private _agoraClientRawUid: number;
  private _token: string;
  public role: ClientRole;
  private onVolumeUpdate: OnVolumeUpdate;

  public get remoteAud() {
    return this._remoteAud;
  }

  public get localAud() {
    return this.rtc.localAud;
  }

  public get client() {
    return this.rtc.client;
  }

  public async switchRole(role: ClientRole) {
    this.role = role;
    await this.client.setClientRole(role);
  }

  public terminate() {
    this.rtc.client.leave();
    this._remoteAud = null;
    this._agoraClientUid = null;
  }

  public static async initRTC(
    ops: ConnectionOptions,
    onVolumeUpdate: OnVolumeUpdate
  ) {
    const { default: AgoraRTC } = await import('agora-rtc-sdk-ng');
    const rtc: RTC = {
      client: AgoraRTC.createClient({ mode: 'live', codec: 'vp8' }),
      localAud: await AgoraRTC.createMicrophoneAudioTrack(),
    };
    const { channelId, initialRole, liveUid } = ops;
    const body: AgoraTokenGenDto = {
      channelName: channelId,
      uid: liveUid,
    };
    const token = await fetchToken(body);
    const agoraClientUid = await rtc.client.join(
      appId,
      channelId,
      token,
      liveUid
    );
    return new Agora({
      rtc,
      agoraClientUid,
      agoraClientRawUid: liveUid,
      channelId,
      token,
      initialRole,
      onVolumeUpdate,
    });
  }

  private constructor({
    rtc,
    agoraClientUid,
    agoraClientRawUid,
    channelId,
    initialRole,
    onVolumeUpdate,
  }: AgoraConstructor) {
    console.log(initialRole);
    this.rtc = rtc;
    this._agoraClientUid = agoraClientUid;
    this._channelId = channelId;
    this._agoraClientRawUid = agoraClientRawUid;
    this.client.enableAudioVolumeIndicator();
    this.initEvents();
    this.initPublish(initialRole);
    this.onVolumeUpdate = onVolumeUpdate.bind(this);
  }

  private initEvents() {
    this.client.on('user-published', async (user, mediaType) => {
      await this.rtc.client.subscribe(user, mediaType);
      this._remoteAud = user.audioTrack ?? null;
      this._remoteAud.play();
    });
    this.client.on('token-privilege-will-expire', this.resetToken);
    this.client.on('volume-indicator', (result) => {
      console.log(result);
      this.onVolumeUpdate(result);
    });
  }

  private async resetToken() {
    console.log('RESET TOKEN FIRED');
    const { _agoraClientRawUid, _channelId } = this;
    console.log('CHANNEL ID ', _channelId);
    const token = await fetchToken({
      channelName: _channelId,
      uid: _agoraClientRawUid,
    });
    this._token = token;
    this.client.renewToken(token);
  }

  private async initPublish(role: ClientRole) {
    this.role = role;
    await this.client.setClientRole(role);
    await this.client.publish([this.rtc.localAud]);
  }
}
