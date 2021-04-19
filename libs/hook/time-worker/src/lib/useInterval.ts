import { useEffect, useState } from 'react';
import dy, { Dayjs } from 'dayjs';

export interface UseIntervalProps {
  intervalMs?: number;
  targetTime: Dayjs;
}

export function useInterval({
  intervalMs = 500,
  targetTime,
}: UseIntervalProps) {
  const [diff, setdiff] = useState(0);

  useEffect(() => {
    if (!targetTime) {
      return;
    }
    const interval = setInterval(() => {
      setdiff(dy().diff(targetTime, 'milliseconds'));
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs, targetTime]);

  return diff;
}
