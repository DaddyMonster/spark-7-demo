import dy from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import { useEffect, useRef, useState } from 'react';
import { useInterval, UseIntervalProps } from './useInterval';
dy.extend(isToday);

export interface UseTimerProps extends Pick<UseIntervalProps, 'targetTime'> {
  onDue?: () => void;
  endDue: number;
}

interface TimeMessage {
  message: string;
  diffInfo: number;
  status: 'live' | 'waiting' | 'terminated';
}

const ONE_HOUR = 1000 * 60 * 60;
const TEN_SECOND = 1000 * 10;
const HALF_SECOND = 500;

export function useSevenTimeMsg({ onDue, targetTime, endDue }: UseTimerProps) {
  const [intervalMs, setintervalMs] = useState(TEN_SECOND); // 10초

  const [timeInfo, setTimeInfo] = useState<TimeMessage>({
    message: '',
    diffInfo: 0,
    status: 'waiting',
  });

  const diff = useInterval({ intervalMs, targetTime });

  const cbRef = useRef<typeof onDue>(null);

  useEffect(() => {
    handleMessage();
  }, [diff]);

  useEffect(() => {
    cbRef.current = onDue ?? null;
  }, [onDue]);

  const handleMessage = () => {
    // 한시간보다 클때
    if (diff * -1 > ONE_HOUR) {
      if (intervalMs !== TEN_SECOND) {
        setintervalMs(TEN_SECOND);
      }
      const date = dy().add(diff);
      const isToday = date.isToday();
      const formatString = isToday ? 'hh : mm' : 'DD/MMM - hh:mm';
      setTimeInfo({
        message: `Live at ${dy().add(diff).format(formatString)}`,
        diffInfo: diff,
        status: 'waiting',
      });
    }

    // 1시간 이내

    if (diff > 0 && diff * -1 < ONE_HOUR) {
      if (intervalMs !== HALF_SECOND) {
        setintervalMs(HALF_SECOND);
      }
      const min = diff / (1000 * 60);
      const sec = diff / 1000;
      setTimeInfo({
        message: `Live in ${min} : ${sec}`,
        diffInfo: diff,
        status: 'waiting',
      });
    }

    // 라이브 중

    if (diff < 0 && diff < endDue) {
      if (intervalMs !== HALF_SECOND) {
        setintervalMs(HALF_SECOND);
      }

      const endDiff = endDue - diff;
      const min = endDiff / (1000 * 60);
      const sec = endDiff / 1000;
      setTimeInfo({
        message: `Live ends in  ${min} : ${sec}`,
        diffInfo: endDiff,
        status: 'live',
      });
    } else {
      // 세션 종료

      if (intervalMs !== TEN_SECOND) {
        setintervalMs(TEN_SECOND);
      }

      setTimeInfo({
        message: 'Terminated',
        diffInfo: diff,
        status: 'terminated',
      });
    }
  };
  return timeInfo;
}
