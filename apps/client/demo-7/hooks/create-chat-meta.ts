import dy from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import { ChatMetaCollection, ChatMetaInput } from '../model/chat-meta';
import { Nation } from '../types/nation';
import { useAuth } from './auth';
dy.extend(utc);

export interface CreateChatMetaInput {
  topic: string;
  description: string;
  startTime: number;
  lang: Nation;
}

export const initialValue: CreateChatMetaInput = {
  topic: '',
  description: '',
  startTime: 5,
  lang: 'en',
};

export const validationSchema = yup.object().shape({
  topic: yup
    .string()
    .max(64, "It's too long")
    .min(12, "It's too short")
    .required('This filed is required'),
  description: yup.string().max(128, "It's too long"),
  startTime: yup
    .number()
    .min(5, 'the earliest you can start is 5 minutes from now')
    .max(1440, 'you have to start within 24 hours'),
});

export function useCreateChatMeta() {
  const { user } = useAuth();

  const router = useRouter();

  const onSubmit = async ({
    startTime: _startTime,
    description,
    topic,
    lang,
  }: CreateChatMetaInput) => {
    const startTime = dy().utc().add(_startTime, 'minute').toDate();
    const meta: ChatMetaInput = {
      createdAt: dy().utc().toDate(),
      description,
      hostId: user.uid,
      lang,
      startTime,
      topic,
    };
    await ChatMetaCollection.add(meta);
    router.push('/seven/my-reservations');
  };
  return { onSubmit };
}
