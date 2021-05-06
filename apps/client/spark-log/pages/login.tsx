import React from 'react';
import { FormProvider } from '@hessed/ui/shared';
import { FormTextField } from '@hessed/ui/web/form';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import { initLoginValue, loginValidationSchema, useLogin } from '../hooks/auth';
import { useHiddenNav } from '../hooks/top-nav/useTopNavHiddenStore';
import AuthFormLayout from '../layout/auth-form/AuthFormLayout';
import { LogAppPageType } from '../types';

const Login: LogAppPageType = () => {
  useHiddenNav(true);
  const router = useRouter();
  const { onSubmit } = useLogin();
  return (
    <AuthFormLayout
      leftHead
      pageLabel="LOGIN"
      subHeaderLabel="Not a member?"
      subHeaderBtnLabel="Join"
      onSubHeaderBtnClick={() => router.push('/register')}
    >
      <FormProvider
        validationSchema={loginValidationSchema}
        initialValues={initLoginValue}
        onSubmit={onSubmit}
      >
        {({ submitForm }) => (
          <>
            <FormTextField label="E-mail" name="email" />
            <FormTextField label="Password" name="password" />
            <div className="flex justify-center w-full">
              <Button sx={{ px: 3 }} onClick={submitForm}>
                Login
              </Button>
            </div>
          </>
        )}
      </FormProvider>
    </AuthFormLayout>
  );
};
Login.layout = 'ANIMATED_LAYOUT';
export default Login;
