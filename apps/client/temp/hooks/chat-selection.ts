import { TranslateDto, Translation } from '@hessed/service-lib/translator';
import axios from 'axios';
import firebase from 'firebase/app';
import { useEffect, useState } from 'react';
import { ChatMessage } from '../model/chat-message';
import { UserCollection, UserDetail } from '../model/user-detail';
import {
  SelectedChatMsg,
  useChatSelectionStore,
} from '../store/chat-selection';
import { Nation } from '../types/nation';
interface UseChatSelectionProps {
  me: UserDetail;
  roomLang: Nation;
}

interface UseChatSelectionReturn {
  setSelectedChatMsg: (msg: ChatMessage) => void;
  selectedChatMsg: SelectedChatMsg;
  addChatToBag: () => Promise<void>;
  translation: string;
}

export function useChatSelection({
  me,
  roomLang,
}: UseChatSelectionProps): UseChatSelectionReturn {
  const { selectedChatMsg, setSelectedChatMsg } = useChatSelectionStore();

  const [translation, settranslation] = useState('');

/*   useEffect(() => {
    if (selectedChatMsg?.message && me) {
      getTranslated();
    }
  }, [selectedChatMsg?.message]);
 */
/*   const getTranslated = async () => {
    const { message } = selectedChatMsg;
    const { localLang } = me;
    if (localLang === roomLang) {
      settranslation(message);
    }
    // AW.... need some nlp process here
    const body: TranslateDto = {
      targetLang: localLang,
      text: [message],
    };
    const fetched = await axios.post('/api/tranlate', body);
    if (fetched.data) {
      const result = fetched.data as Translation;
      console.log('TRANSLATION RESULT', result);
      settranslation(result?.translations?[0] ? result.translations[0].text : '');
    }
  }; */

  const addChatToBag = async () => {
    if (!selectedChatMsg) {
      return;
    }

    await UserCollection.doc(me.uid).update({
      chatBag: firebase.firestore.FieldValue.arrayUnion(selectedChatMsg.id),
    });
    setSelectedChatMsg(null);
  };

  return { setSelectedChatMsg, selectedChatMsg, addChatToBag, translation };
}
