import firebase from 'firebase/app';
import { AiOutlineConsoleSql } from 'react-icons/ai';
import { ChatMeta, ChatMetaCollection } from '../model/chat-meta';
import { useChatStore, useReservedStore } from '../store/chat.store';
import { useAuth } from './auth';

interface UseChatListReturn {
  learningLists: ChatMeta[];
  localLists: ChatMeta[];
  filterOutdated: () => void;
}

export function useChatList(): UseChatListReturn {
  const { learnigLangs, myLang, filterOutdated } = useChatStore();

  return {
    learningLists: learnigLangs,
    localLists: myLang,
    filterOutdated,
  };
}

interface UseReservedChat {
  reserved: ChatMeta[];
  addReserved: (meta: ChatMeta) => void;
  removeReserved: (id: string) => void;
}

export function useReservedChat(): UseReservedChat {
  const { reserved, setReserved } = useReservedStore();
  const { user } = useAuth();
  const addReserved = async (meta: ChatMeta) => {
    if (!user) {
      return;
    }

    console.log('HOOK META', meta);

    const { id } = meta;
    const { uid } = user;
    setReserved([...reserved, meta]);
    await ChatMetaCollection.doc(id).update({
      reserved: firebase.firestore.FieldValue.arrayUnion(uid),
    });
  };
  const removeReserved = async (id: string) => {
    const { uid } = user;
    await ChatMetaCollection.doc(id).update({
      reserved: firebase.firestore.FieldValue.arrayRemove(uid),
    });
    setReserved(reserved.filter((x) => x.id !== id));
  };

  return { reserved, addReserved, removeReserved };
}
