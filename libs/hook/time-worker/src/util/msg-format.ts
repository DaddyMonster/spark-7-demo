import { Translate } from 'next-translate';

type PossibleT = Translate | undefined;
interface LiveInMsgProps {
  min: number;
  sec: number;
}

interface LiveInMsgWithHourProps extends LiveInMsgProps {
  hour: number;
}

const plural = (count: number, str: string) => (count > 1 ? str + 's' : str);

export const liveInMessageNoHour = (
  t: PossibleT,
  { min, sec }: LiveInMsgProps
) => {
  return t
    ? t('live-in-msg', { min, sec })
    : `Live In ${min} ${plural(min, 'minute')} : ${sec} ${plural(
        sec,
        'seconds'
      )}`;
};
export const liveInMessage = (
  t: PossibleT,
  { hour, min, sec }: LiveInMsgWithHourProps
) => {
  if (hour < 1) {
    return liveInMessageNoHour(t, { min, sec });
  }
  return t
    ? t('live-in-msg-hour', { hour, min, sec })
    : `Live In ${hour} ${plural(hour, 'hour')} : ${min} ${plural(
        min,
        'min'
      )} : ${sec} ${plural(sec, 'sec')}`;
};

export const liveEndsInMessage = (
  t: PossibleT,
  { min, sec }: LiveInMsgProps
) => {
  return t
    ? t('live-ends-in-msg', { min, sec })
    : `Live Ends In ${min} ${plural(min, 'minute')} ${sec} ${plural(
        sec,
        'second'
      )}`;
};
