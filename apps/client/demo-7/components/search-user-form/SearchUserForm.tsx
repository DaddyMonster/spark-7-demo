import { tagMap } from '@hessed/client-module/chat-tag';
import { nationMapList } from '@hessed/client-module/seven-shared';
import { FormProvider } from '@hessed/ui/shared';
import { NationFlag } from '@hessed/ui/web/atom';
import { FormSimpleAutoComplete, FormTextField } from '@hessed/ui/web/form';
import { Button, Grid, Typography } from '@material-ui/core';
import { FormikHelpers } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import styled from 'styled-components';
import {
  INIT_SEARCH_USER_QUERY,
  SearchUserValues,
} from '../../hooks/useSearchUser';

interface SearchUserFormProps {
  onSubmit: (
    val: SearchUserValues,
    helpers: FormikHelpers<SearchUserValues>
  ) => void;
}

export const SearchUserForm = ({ onSubmit }: SearchUserFormProps) => {
  const { t } = useTranslation('search-user-form');
  return (
    <div className="px-5 w-full">
      <FormProvider initialValues={INIT_SEARCH_USER_QUERY} onSubmit={onSubmit}>
        {({ submitForm }) => (
          <FormBox>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormTextField name="username" label={t('username')} />
                <FormSimpleAutoComplete
                  label={t('interest')}
                  removeable
                  onRemoveClick={() => null}
                  name="interest"
                  options={tagMap}
                  getValue={(val) => val.id}
                  getLabel={(val) => val.id}
                  optionRenderer={({ id }) => (
                    <div className="flex items-center w-full" key={id}>
                      <Typography>{id}</Typography>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormSimpleAutoComplete
                  label={t('localLang')}
                  name="localLang"
                  removeable
                  options={nationMapList}
                  getValue={(val) => val.code}
                  getLabel={(val) => val.label}
                  optionRenderer={({ code, iconPath, label }) => (
                    <div className="flex items-center w-full" key={code}>
                      <NationFlag src={iconPath} size={15} className="mr-2" />
                      <Typography>
                        {label} ({code})
                      </Typography>
                    </div>
                  )}
                />
                <FormSimpleAutoComplete
                  label={t('learningLang')}
                  name="learningLang"
                  removeable
                  onRemoveClick={() => null}
                  options={nationMapList}
                  getValue={(val) => val.code}
                  getLabel={(val) => val.label}
                  optionRenderer={({ code, iconPath, label }) => (
                    <div className="flex items-center w-full" key={code}>
                      <NationFlag src={iconPath} size={15} className="mr-2" />
                      <Typography>
                        {label} ({code})
                      </Typography>
                    </div>
                  )}
                />
              </Grid>
            </Grid>
            <div className="w-full flex justify-center py-3">
              <Button
                className="px-6"
                variant="contained"
                type="submit"
                onClick={() => submitForm()}
              >
                {t('search-submit')}
              </Button>
            </div>
          </FormBox>
        )}
      </FormProvider>
    </div>
  );
};
const FormBox = styled.div(({ theme }) => ({
  padding: theme.spacing(1.5, 2.5),
}));
