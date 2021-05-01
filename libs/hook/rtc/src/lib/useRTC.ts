import { ClientRole, UID } from 'agora-rtc-sdk-ng';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Agora, AudIndicator } from './agora-audio-rtc';

interface UseRTCProps {
  chatId: string;
  isHost: boolean;
  ready: boolean;
  liveUid: number;
  useGlobalSetter?: (arg: UidMap) => void;
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
  useGlobalSetter,
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
  }, [ready]);

  const onVolumeUpdate = (audIndicators: AudIndicator[]) => {
    const newMap = new Map(userVolumeMap);
    audIndicators.forEach(({ uid, level }) => {
      if (level > 5) {
        newMap.set(uid, level);
      }
    });
    console.log(newMap)
    useGlobalSetter && useGlobalSetter(newMap);
    setvolumeMap(newMap);
  };

  const setVolume = useCallback(
    (val: number) => {
      rtcRef.current.setVolume(val);
    },
    [rtcRef.current]
  );

  const initRTC = async (channelId: string) => {
    rtcRef.current = await Agora.initClient(
      {
        channelId,
        initialRole: 'host' /* isHost ? 'host' : 'audience' */,
        liveUid,
      },
      onVolumeUpdate
    );
  };

  const switchRole = useCallback(
    (role: ClientRole) => rtcRef.current.switchRole(role),
    [rtcRef.current]
  );

  const memoized = useMemo(() => ({ userVolumeMap }), [userVolumeMap]);

  return { setVolume, switchRole, ...memoized };
}
