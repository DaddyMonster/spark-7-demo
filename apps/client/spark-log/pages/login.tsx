import { FormProvider } from '@hessed/ui/shared';
import { FormTextField } from '@hessed/ui/web/form';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { initLoginValue, loginValidationSchema, useLogin } from '../hooks/auth';
import { useHiddenNav } from '../hooks/top-nav/useTopNavHiddenStore';
import AuthFormLayout from '../layout/auth-form/AuthFormLayout';
import OAuthButtons from '../layout/auth-form/OAuthButtons';
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
      rootLayoutId="login-btn"
    >
      <FormProvider
        validationSchema={loginValidationSchema}
        initialValues={initLoginValue}
        onSubmit={onSubmit}
      >
        {({ submitForm }) => (
          <>
            <FormTextField label="E-mail" name="email" />
            <FormTextField label="Password" name="password" type="password" />
            <div className="flex justify-center w-full pt-1">
              <Button
                sx={{ mx: 3, flex: 1 }}
                onClick={submitForm}
                variant="contained"
              >
                Login
              </Button>
            </div>
          </>
        )}
      </FormProvider>
      <OAuthButtons />
    </AuthFormLayout>
  );
};
Login.layout = 'ANIMATED_LAYOUT';
export default Login;
