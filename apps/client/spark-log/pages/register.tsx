import { FormProvider } from '@hessed/ui/shared';
import { SimpleAutoComplete } from '@hessed/ui/web/atom';
import { FormTextField } from '@hessed/ui/web/form';
import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import {
  useRegister,
  initRegisterValue,
  validationSchema,
} from '../hooks/auth/useRegister';
import AuthFormLayout from '../layout/auth-form/AuthFormLayout';
import { LogAppPageType } from '../types';

const Register: LogAppPageType = () => {
  const router = useRouter();
  const { onSubmit } = useRegister();
  return (
    <AuthFormLayout
      leftHead={false}
      pageLabel="REGISTER"
      subHeaderLabel="Already a member?"
      subHeaderBtnLabel="Login"
      onSubHeaderBtnClick={() => router.push('/login')}
      rootLayoutId="register-btn"
    >
      <FormProvider
        validationSchema={validationSchema}
        initialValues={initRegisterValue}
        onSubmit={onSubmit}
      >
        {({ submitForm }) => (
          <>
            <FormTextField label="E-mail" name="email" />
            <FormTextField label="Password" name="password" />
            <FormTextField label="Password Check" name="passCheck" />
            <FormTextField label="Display Name" name="displayName" />
            {/* <SimpleAutoComplete /> */}
            <div className="flex justify-center w-full pt-1">
              <Button
                sx={{ mx: 3, flex: 1 }}
                onClick={submitForm}
                variant="contained"
              >
                Register
              </Button>
            </div>
          </>
        )}
      </FormProvider>
    </AuthFormLayout>
  );
};

export default Register;
