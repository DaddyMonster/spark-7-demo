import { useEffect, useRef, useState } from 'react';
import dy, { Dayjs } from 'dayjs';

export interface UseIntervalProps {
  intervalMs?: number;
  targetTime?: Dayjs;
}

export function useInterval({
  intervalMs = 500,
  targetTime = dy().add(1, 'minutes'),
}: UseIntervalProps) {
  const [diff, setdiff] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!targetTime || intervalRef.current) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setdiff(dy().diff(targetTime, 'milliseconds'));
    }, intervalMs);

    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [intervalMs, targetTime]);

  return diff;
}
