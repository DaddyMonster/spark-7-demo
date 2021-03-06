import { Container } from '@material-ui/core';
import { useChatList } from '../../../hooks/chat';
import React, { useState } from 'react';
import Crumb from '../../../components/atoms/crumb/Crumb';
import ChatMetaCard from '../../../components/cards/ChatMetaCard';
import CarouselTemplate from '../../../components/carousel/CarouselTemplate';
import DetailViewModal from '../../../components/modal/DetailViewModal';
import { ChatMeta } from '../../../model/chat-meta';
import { CustomPageType } from '../../../types/custom-page';

const SevenHome: CustomPageType = () => {
  const [selectedChatMeta, setselectedChatMeta] = useState<ChatMeta | null>(
    null
  );
  const { learningLists, localLists } = useChatList();

  const onItemClick = (id: string, listType: 'learning' | 'local') => {
    const list = listType === 'learning' ? learningLists : localLists;
    const item = list.find((x) => x.id === id);
    if (!item) return;
    setselectedChatMeta(item);
  };
  const onModalClose = () => setselectedChatMeta(null);

  return (
    <div className="overflow-hidden">
      {selectedChatMeta && (
        <DetailViewModal onClose={onModalClose} chatMeta={selectedChatMeta} />
      )}

      <div className="px-8">
        <Crumb
          appName="Seven Talk"
          title="Discover your favor"
          subTitle="Checkout 7-min live sessions and upcommings"
        />
        <Container maxWidth="lg">
          <CarouselTemplate
            title="Learn Your desired Languages"
            noList={
              learningLists.length > 0
                ? null
                : "There's no chat available in your learnign Language"
            }
          >
            {learningLists.map((x, i) => (
              <div key={i} className="p-3">
                <ChatMetaCard
                  {...x}
                  onClick={(id) => onItemClick(id, 'learning')}
                />
              </div>
            ))}
          </CarouselTemplate>
          <CarouselTemplate
            title="Help others learn your language"
            noList={
              localLists.length > 0
                ? null
                : "There's no chat available in your Language"
            }
          >
            {localLists.map((x, i) => (
              <div key={i} className="p-3">
                <ChatMetaCard
                  {...x}
                  onClick={(id) => onItemClick(id, 'local')}
                />
              </div>
            ))}
          </CarouselTemplate>
        </Container>
      </div>
    </div>
  );
};
SevenHome.layout = 'SEVEN_LAYOUT';
export default SevenHome;

/* const mockItem: ChatMeta = {
  createdAt: dy().subtract(15, 'minutes').toDate(),
  description:
    'Cupidatat ullamco commodo eu culpa dolore sint magna nostrud enim cupidatat fugiat sunt eiusmod.',
  host: {
    displayName: 'Daniel',
    email: 'tioaosi@ajfkja.com',
    learningLang: ['ko'],
    localLang: 'en',
    registered: true,
    uid: 'asdjaisdjaisjd',
    photoURL: 'https://material-ui.com/static/images/avatar/1.jpg',
  },
  hostId: 'asdjaisdjaisjd',
  id: 'sjiadjfiasjdf',
  lang: 'en',
  startTime: dy().add(3, 'minutes').toDate(),
  topic: "Let's talk about some fun stuff",
  reserved: Array(15).fill({
    uid: 'sodajdosdj',
    displayName: 'David',
    photoURL: 'https://material-ui.com/static/images/avatar/1.jpg',
  }),
};

const mockList = [mockItem]; */
