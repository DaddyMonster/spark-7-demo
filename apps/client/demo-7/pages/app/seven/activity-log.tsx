import { FbTimestamp } from '@hessed/client-lib/firebase';
import { useSevenAuth } from '@hessed/client-module/seven-auth';
import { Chat, useChatList } from '@hessed/client-module/seven-chat';
import { AppBaseContainer } from '@hessed/ui/web/layout';
import { GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

const ActivityLog = () => {
  const { t } = useTranslation('activity-log');
  const { user } = useSevenAuth();



  const ReservedChats = useChatList({
    queryCacheKey: user?.localLang,
    paging: 5,
    listQuery: (ts) => Chat.collection.where(),
  });

  return (
    <AppBaseContainer
      title={t('page-title')}
      subTitle={t('page-subtitle')}
      appName="Seven"
      hideCrumbOnDownSm={false}
    ></AppBaseContainer>
  );
};

export default ActivityLog;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      layout: 'SEVEN_NORMAL_LAYOUT',
    },
  };
};
