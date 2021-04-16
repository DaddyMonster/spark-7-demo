import { FbTimestamp } from '@hessed/client-lib/firebase';
import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import { FormikHelpers } from 'formik';
import { nanoid } from 'nanoid';
import { Chat } from './chat.collection';
import { ChatRoom, CreateChatRoom } from './model';

interface UseChatRoomGenArgs {
  userInfo: SevenUserInfo;
  onCreate: () => void;
}
interface UseChatRoomGenReturn {
  onSubmit: (
    info: CreateChatRoom,
    helpers: FormikHelpers<CreateChatRoom>
  ) => void;
}

export function useChatRoomGen({
  onCreate,
  userInfo,
}: UseChatRoomGenArgs): UseChatRoomGenReturn {
  const onSubmit = async ({
    description,
    startTimeDyjs,
    lang,
    topic,
    tags,
  }: CreateChatRoom) => {
    const id = nanoid();

    const chatRoom: ChatRoom = {
      createdAt: FbTimestamp.fromDate(new Date()),
      description,
      host: userInfo,
      hostId: userInfo.uid,
      id,
      lang,
      reserved: [],
      startTime: FbTimestamp.fromDate(startTimeDyjs.toDate()),
      topic,
      tags,
    };
    await Chat.collection.doc(id).set(chatRoom);
    onCreate();
  };
  return { onSubmit };
}
