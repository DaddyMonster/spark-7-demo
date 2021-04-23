import { tagMap } from '@hessed/client-module/chat-tag';
import { useSevenAuth } from '@hessed/client-module/seven-auth';
import {
  nationMapList,
  SEVEN_TOP_NAV_HEIGHT,
} from '@hessed/client-module/seven-shared';
import { FormProvider } from '@hessed/ui/shared';
import { BoxedTypo, NationFlagSquare } from '@hessed/ui/web/atom';
import {
  DateTimePickerForm,
  FormSimpleAutoComplete,
  FormTextArea,
  FormTextField,
  MultiSelectTagForm,
} from '@hessed/ui/web/form';
import { AppBaseContainer } from '@hessed/ui/web/layout';
import { Button, Paper, TextField, Typography } from '@material-ui/core';
import dy from 'dayjs';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { Container } from 'next/app';
import React from 'react';
import styled from 'styled-components';
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
            onSubmit={() => console.log('TRIGGERED...')}
            initialValues={INIT_VALUE}
          >
            {({ values }) => (
              <FormBox>
                <FormTextField label={t('form-topic')} name="topic" />
                <FormTextArea
                  label={t('form-description')}
                  name="description"
                />
                <FormSimpleAutoComplete
                  label={t('form-lang')}
                  name="lang"
                  options={nationMapList}
                  getValue={(val) => val.code}
                  getLabel={(val) => val.label}
                  defaultVal={nationMapList[0]}
                  optionRenderer={({ code, iconPath, label }) => (
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
                <DateTimePickerForm
                  label={t('form-start-time')}
                  name="startTime"
                  openTo="hours"
                  defaultValue={dy()
                    .add(5, 'minutes')
                    .add(5, 'seconds')
                    .toDate()}
                  minDate={dy().add(5, 'minutes').toDate()}
                  maxDate={dy().add(8, 'days').toDate()}
                />
                <MultiSelectTagForm
                  label={t('form-tags')}
                  modalHead={t('form-tags')}
                  name="tags"
                  tagItems={tagMap}
                  cancelLabel={t('common:cancel')}
                  submitLabel={t('common:submit')}
                />
                <div className="w-full flex justify-center py-3">
                  <Button
                    className="px-6"
                    variant="contained"
                    onClick={() => onSubmit(values)}
                  >
                    {t('form-create')}
                  </Button>
                </div>
              </FormBox>
            )}
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
    height: `calc(100vh - ${SEVEN_TOP_NAV_HEIGHT}px)`,
  },
}));

const NewTopic = styled(BoxedTypo)(({ theme }) => ({
  transform: 'rotate(-2deg) translate(-10px , -5px)',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('md')]: {
    transform: 'none',
  },
}));

const FormBox = styled(Container).attrs({ maxWidth: 'xs' })(({ theme }) => ({
  padding: theme.spacing(1.5, 2.5),
}));
