import { Container } from '@material-ui/core';
import CarouselTemplate from '../../../components/carousel/CarouselTemplate';
import React from 'react';
import Crumb from '../../../components/atoms/crumb/Crumb';
import { CustomPageType } from '../../../types/custom-page';
import { ChatMetaJoined } from '../../../model/chat-meta';
import dy from 'dayjs';
import ChatMetaCard from '../../../components/cards/ChatMetaCard';

const mockItem: ChatMetaJoined = {
  createdAt: dy().subtract(15, 'minutes'),
  description:
    'Cupidatat ullamco commodo eu culpa dolore sint magna nostrud enim cupidatat fugiat sunt eiusmod.',
  fresh: true,
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
  startTime: dy().add(3, 'minutes'),
  topic: "Let's talk about some fun stuff",
};

const SevenHome: CustomPageType = () => {
  return (
    <div className="px-8 overflow-hidden">
      <Container maxWidth="lg">
        <Crumb
          appName="Seven Talk"
          title="Discover your favor"
          subTitle="Checkout 7-min live sessions and upcommings"
        />
        <CarouselTemplate title="Chat in Your target Language">
          {Array(17)
            .fill(mockItem)
            .map((x, i) => (
              <div key={i} className="p-3">
                <ChatMetaCard {...x} onClick={(id) => console.log(id)} />
              </div>
            ))}
        </CarouselTemplate>
        <CarouselTemplate title="Be fluent">
          {Array(17)
            .fill(mockItem)
            .map((x, i) => (
              <div key={i} className="p-3">
                <ChatMetaCard {...x} onClick={(id) => console.log(id)} />
              </div>
            ))}
        </CarouselTemplate>
      </Container>
    </div>
  );
};
SevenHome.layout = 'SEVEN_LAYOUT';
export default SevenHome;
