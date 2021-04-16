import { ClientRole, UID } from 'agora-rtc-sdk-ng';
import { useEffect, useRef, useState } from 'react';
import { Agora, AudIndicator } from './agora-rtc';

interface UseRTCProps {
  chatId: string;
  isHost: boolean;
  ready: boolean;
  liveUid: number;
}

export type UidMap = Map<UID, number>;

interface UseLiveAudioReturn {
  switchRole: (role: ClientRole) => void;
  userVolumeMap: UidMap;
  setVolume: (val: number) => void;
}

export function useRTC({
  liveUid,
  chatId,
  isHost,
  ready,
}: UseRTCProps): UseLiveAudioReturn {
  const [userVolumeMap, setvolumeMap] = useState<UidMap>(new Map());
  const rtcRef = useRef<Agora>(null);

  useEffect(() => {
    if (!ready) {
      return;
    }
    initRTC(chatId);
    return () => {
      if (rtcRef.current) {
        rtcRef.current.terminate();
        rtcRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  const onVolumeUpdate = (audIndicators: AudIndicator[]) => {
    const newMap = new Map(userVolumeMap);
    audIndicators.forEach(({ uid, level }) => {
      if (level > 5) {
        newMap.set(uid, level);
      }
    });
    setvolumeMap(newMap);
  };

  const setVolume = (val: number) => {
    rtcRef.current.setVolume(val);
  };

  const initRTC = async (channelId: string) => {
    rtcRef.current = await Agora.initClient(
      {
        channelId,
        initialRole: isHost ? 'host' : 'audience',
        liveUid,
      },
      onVolumeUpdate
    );
  };

  const switchRole = (role: ClientRole) => rtcRef.current.switchRole(role);
  return { setVolume, switchRole, userVolumeMap };
}
