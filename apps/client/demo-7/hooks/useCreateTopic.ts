import { ChatTagUnion } from '@hessed/client-module/chat-tag';
import { Nation, nationList } from '@hessed/client-module/seven-shared';
import dy, { Dayjs } from 'dayjs';
import { FormikHelpers } from 'formik';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { FbTimestamp } from '@hessed/client-lib/firebase';
import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import { Chat, ChatRoom } from '@hessed/client-module/seven-chat';
import { mergedChatTags } from '@hessed/client-module/chat-tag';
import * as yup from 'yup';
import useTranslation from 'next-translate/useTranslation';

interface CreateTopicInput {
  topic: string;
  description: string;
  lang: Nation | null;
  tags: ChatTagUnion[];
  startTime: Dayjs;
}

export const INIT_VALUE: CreateTopicInput = {
  topic: '',
  description: '',
  lang: null,
  startTime: dy(),
  tags: [],
};

interface UseCreaetTopicReturn {
  onSubmit: (
    val: CreateTopicInput,
    helper: FormikHelpers<CreateTopicInput>
  ) => void;
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
  const onSubmit = async (
    _val: CreateTopicInput,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _: FormikHelpers<CreateTopicInput>
  ) => {
    const router = useRouter();
    if (!userInfo) {
      return; // WILL NEVER HAPPEN!
    }
    const id = nanoid();
    const values: ChatRoom = {
      ..._val,
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
      .transform(function (currentValue: Dayjs) {
        if (this.isType(currentValue) && 'toDate' in currentValue) {
          return currentValue.toDate();
        }
      })
      .required(),
    tags: yup.string().oneOf(mergedChatTags).required(t('required')),
  });

  return { onSubmit, validationSchema };
}
