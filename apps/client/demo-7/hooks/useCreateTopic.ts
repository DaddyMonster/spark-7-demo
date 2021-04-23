import { ChatTagUnion } from '@hessed/client-module/chat-tag';
import { Nation, nationList } from '@hessed/client-module/seven-shared';
import dy, { Dayjs } from 'dayjs';
import { FormikHelpers } from 'formik';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { FbTimestamp } from '@hessed/client-lib/firebase';
import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import { Chat, ChatRoom } from '@hessed/client-module/seven-chat';
import * as yup from 'yup';
import useTranslation from 'next-translate/useTranslation';

interface CreateTopicInput {
  topic: string;
  description: string;
  lang: Nation;
  tags: Set<ChatTagUnion>;
  startTime: Dayjs;
}

export const INIT_VALUE: CreateTopicInput = {
  topic: '',
  description: '',
  lang: 'en',
  startTime: dy(),
  tags: new Set(),
};

interface UseCreaetTopicReturn {
  onSubmit: (val: CreateTopicInput) => void;
  // eslint-disable-next-line @typescript-eslint/ban-types
  validationSchema: yup.ObjectSchema<{}>;
}

interface UseCreateTopicProps {
  userInfo: SevenUserInfo | null;
}

export function useCreateTopic({
  userInfo,
}: UseCreateTopicProps): UseCreaetTopicReturn {
  const { t } = useTranslation('validation');
  const router = useRouter();
  const onSubmit = async (
    _val: CreateTopicInput
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ) => {
    if (!userInfo) {
      return; // WILL NEVER HAPPEN!
    }
    console.log(_val, userInfo);

    const id = nanoid();
    const values: ChatRoom = {
      ..._val,
      tags: [..._val.tags],
      startTime: FbTimestamp.fromDate(_val.startTime.toDate()),
      createdAt: FbTimestamp.fromDate(new Date()),
      host: userInfo,
      hostId: userInfo.uid,
      id,
      reserved: [],
    };
    await Chat.collection.doc(id).set(values);
    router.push('/app/seven/my-reservation');
  };

  const validationSchema = yup.object().shape({
    topic: yup
      .string()
      .min(8, t('min-string', { count: 8 }))
      .max(32, t('max-string', { count: 32 }))
      .required(t('required')),
    description: yup
      .string()
      .min(0, t('min-string', { count: 8 }))
      .max(64, t('max-string', { count: 32 })),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lang: yup
      .string()
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .oneOf(nationList as any)
      .required(t('required')),
    startTime: yup
      .date()
      .min(new Date(), t('min-date', { count: 5, unit: 'minutes' }))
      .max(
        dy().add(1, 'months').toDate(),
        t('max-date', { count: 1, unit: 'month' })
      )
      .required(t('required')),
    tags: yup
      .array()
      .of(yup.string())
      .min(1, t('list-min', { count: 1, fieldName: 'Tag' }))
      .max(5, t('list-max', { count: 5, fieldName: 'Tag' }))
      .required(t('required'))
      .transform(function (_, original) {
        console.log([...original]);
        return [...original];
      }),
  });

  return { onSubmit, validationSchema };
}
