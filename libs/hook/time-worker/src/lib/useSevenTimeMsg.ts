import dy from 'dayjs';
import dr from 'dayjs/plugin/duration';
import isToday from 'dayjs/plugin/isToday';
import { Translate } from 'next-translate';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { liveEndsInMessage, liveInMessage } from '../util/msg-format';
import { useInterval, UseIntervalProps } from './useInterval';
dy.extend(isToday);
dy.extend(dr);

export interface UseTimerProps extends Pick<UseIntervalProps, 'targetTime'> {
  onDue?: () => void;
  endDue?: number; // miliseconds;
  t?: Translate;
}

type LiveStatus = 'live' | 'waiting' | 'terminated';

const ONE_HOUR = 1000 * 60 * 60;
const TEN_SECOND = 1000 * 10;
const HALF_SECOND = 500;

export function useSevenTimeMsg({
  onDue,
  targetTime,
  endDue = 1000 * 7 * 60,
  t,
}: UseTimerProps) {
  const [intervalMs, setintervalMs] = useState(TEN_SECOND); // 10초
  const [message, setMessage] = useState('');

  const diff = useInterval({ intervalMs, targetTime });
  const cbRef = useRef<typeof onDue>(null);

  useEffect(() => {
    handleInterval();
    handleMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(diff);
  }, [diff]);

  useEffect(() => {
    cbRef.current = onDue ?? null;
  }, [onDue]);

  const status = useMemo((): LiveStatus => {
    if (diff > 0 && diff < endDue) {
      return 'live';
    }
    if (diff > endDue) {
      return 'terminated';
    }
    return 'waiting';
  }, [diff, endDue]);

  const handleInterval = useCallback(() => {
    // TERMINATED
    if (status === 'terminated' && intervalMs !== TEN_SECOND) {
      return setintervalMs(TEN_SECOND);
    }

    const halfSecCondition = status === 'live' || diff * -1 < ONE_HOUR;
    if (halfSecCondition && intervalMs !== HALF_SECOND) {
      return setintervalMs(HALF_SECOND);
    }

    if (status === 'waiting' && diff * -1 > ONE_HOUR) {
      return setintervalMs(TEN_SECOND);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diff, status]);

  const handleMessage = () => {
    if (status === 'terminated') {
      return setMessage(t ? t('live-terminated') : 'Terminated');
    }

    if (status === 'waiting') {
      const dr = dy.duration(diff * -1);
      const hour = Math.floor(dr.asHours());
      const _min = Math.floor(dr.asMinutes());
      const min = _min % 60;
      const sec = Math.floor(dr.asSeconds() - _min * 60);
      return setMessage(liveInMessage(t, { hour, min, sec }));
    }

    if (status === 'live') {
      const endTime = dy(targetTime).add(endDue);
      const endDiff = dy().diff(endTime, 'milliseconds');
      const dr = dy.duration(endDiff * -1);
      const _min = Math.floor(dr.asMinutes());
      const min = _min % 60;
      const sec = Math.floor(dr.asSeconds() - _min * 60);
      return setMessage(liveEndsInMessage(t, { min, sec }));
    }
  };
  return { message, status };
}
