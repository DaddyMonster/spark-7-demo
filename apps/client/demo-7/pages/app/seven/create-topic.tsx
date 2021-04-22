import { FormProvider } from '@hessed/ui/shared';
import { BoxedTypo, NationFlagSquare } from '@hessed/ui/web/atom';
import {
  FormSimpleAutoComplete,
  FormTextArea,
  FormTextField,
} from '@hessed/ui/web/form';
import { AppBaseContainer } from '@hessed/ui/web/layout';
import { Paper, Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import { Container } from 'next/app';
import React from 'react';
import styled from 'styled-components';
import { useSevenAuth } from '../../../../../../libs/client-module/seven-auth/src';
import { nationMapList } from '../../../../../../libs/client-module/seven-shared/src';
import { INIT_VALUE, useCreateTopic } from '../../../hooks/useCreateTopic';

const CreateTopic = () => {
  const { t } = useTranslation('seven-create-topic');
  const { user } = useSevenAuth();
  const { onSubmit, validationSchema } = useCreateTopic({ userInfo: user });

  return (
    <AppBaseContainer
      appName="Seven"
      subTitle={t('page-subtitle')}
      title={t('page-title')}
    >
      <Root>
        <RootCard>
          <NewTopic>{t('new-topic')}</NewTopic>
          <FormProvider
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            initialValues={INIT_VALUE}
          >
            <FormBox>
              <FormTextField label={t('form-topic')} name="topic" />
              <FormTextArea label={t('form-description')} name="description" />
              <FormSimpleAutoComplete
                label={t('form-lang')}
                name="lang"
                getValue={({ code }) => code}
                acProps={{
                  options: nationMapList,
                  getOptionLabel: ({ label }) => label,
                }}
                renderer={({ code, label, iconPath }) => (
                  <div className="flex items-center w-full" key={code}>
                    <NationFlagSquare
                      src={iconPath}
                      size={15}
                      className="mr-2"
                    />
                    <Typography>
                      {label} ({code})
                    </Typography>
                  </div>
                )}
              />
            </FormBox>
          </FormProvider>
        </RootCard>
      </Root>
    </AppBaseContainer>
  );
};

export default CreateTopic;

export async function getStaticProps() {
  return {
    props: {
      layout: 'SEVEN_NORMAL_LAYOUT',
    },
  };
}

const Root = styled.div(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const RootCard = styled(Paper)(({ theme }) => ({
  minWidth: 500,
  maxWidth: 500,
  position: 'relative',
  [theme.breakpoints.down('sm')]: {
    width: '100vw',
  },
}));

const NewTopic = styled(BoxedTypo)(({ theme }) => ({
  transform: 'rotate(-2deg) translate(-10px , -5px)',
  [theme.breakpoints.down('md')]: {
    transform: 'none',
  },
}));

const FormBox = styled(Container).attrs({ maxWidth: 'xs' })(({ theme }) => ({
  padding: theme.spacing(1.5, 2.5),
}));
