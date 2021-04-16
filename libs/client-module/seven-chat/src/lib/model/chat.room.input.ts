import dy from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Dayjs } from 'dayjs';
import { ChatRoom } from './chat.room.type';
import * as yup from 'yup';
dy.extend(utc);

export interface CreateChatRoom
  extends Pick<ChatRoom, 'topic' | 'description' | 'lang' | 'tags'> {
  startTimeDyjs: Dayjs;
}

export const chatRoomInitVal: CreateChatRoom = {
  topic: '',
  description: '',
  startTimeDyjs: dy().utc().add(5, 'minutes'),
  lang: 'en',
  tags: [],
};

export const chatRoomValidation = yup.object().shape({
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
