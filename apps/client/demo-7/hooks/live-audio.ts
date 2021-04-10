import { ClientRole, UID } from 'agora-rtc-sdk-ng';
import { useEffect, useRef, useState } from 'react';
import { Agora, AudIndicator } from '../lib/agora';
interface UseLiveAudioProps {
  chatMetaId: string;
  isHost: boolean;
  ready: boolean;
  liveUid: number;
}
type UidMap = Map<UID, number>;

interface UseLiveAudioReturn {
  switchRole: (role: ClientRole) => void;
  userVolumeMap: UidMap;
}

export function useLiveAudio({
  chatMetaId,
  isHost,
  ready,
  liveUid,
}: UseLiveAudioProps): UseLiveAudioReturn {
  const [userVolumeMap, setvolumeMap] = useState<UidMap>(new Map());
  const agoraRef = useRef<Agora>(null);

  useEffect(() => {
    if (!chatMetaId || !ready || liveUid < 0) {
      return;
    }

    initAgora(chatMetaId);
    return () => {
      if (agoraRef.current) {
        agoraRef.current.terminate();
        agoraRef.current = null;
      }
    };
  }, [chatMetaId, ready, liveUid]);

  const onVolumeUpdate = (audIndicators: AudIndicator[]) => {
    const newMap = new Map(userVolumeMap);
    audIndicators.forEach(({ uid, level }) => {
      newMap.set(uid, level);
    });
    setvolumeMap(newMap);
  };

  const initAgora = async (channelId: string) => {
    agoraRef.current = await Agora.initRTC(
      {
        channelId,
        initialRole: isHost ? 'host' : 'audience',
        liveUid,
      },
      onVolumeUpdate
    );
  };

  const switchRole = (role: ClientRole) => agoraRef.current.switchRole(role);

  return { switchRole, userVolumeMap };
}
