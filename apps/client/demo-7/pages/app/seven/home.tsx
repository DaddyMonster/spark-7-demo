import { AppBaseContainer } from '@hessed/ui/web/layout';
import { GetServerSideProps } from 'next';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { SevenPageType } from '../../../types';

const SevenHome: SevenPageType = () => {
  const { t } = useTranslation('seven-home');
  return (
    <AppBaseContainer
      title={t('page-title')}
      subTitle={t('page-subtitle')}
      appName="Seven"
      hideCrumbOnDownSm={false}
    >
      <h1>HOME</h1>
    </AppBaseContainer>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {
      layout: 'SEVEN_NORMAL_LAYOUT',
    },
  };
};

export default SevenHome;
