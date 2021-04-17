import { Form, Formik, FormikConfig, FormikProps } from 'formik';
import React, { useEffect } from 'react';

interface CustomErrorBase<_Shape_> {
  fieldName: keyof _Shape_;
  message: string;
}

export type CustomError<T> = CustomErrorBase<T> | null;

export interface FormProviderProps<_Shape_> extends FormikConfig<_Shape_> {
  customError?: CustomError<_Shape_>;
}

export function FormProvider<_Shape_ = Record<string, unknown>>({
  children,
  customError = null,
  ...props
}: FormProviderProps<_Shape_>) {
  return (
    <Formik {...props}>
      {(formikProps) => (
        <Form>
          {customError && (
            <CustomErrorHandler {...formikProps} customError={customError} />
          )}
          {children}
        </Form>
      )}
    </Formik>
  );
}

interface CustomErrorHandlerProps<_Shape_> extends FormikProps<_Shape_> {
  customError: CustomError<_Shape_>;
}

export function CustomErrorHandler<_Shape_>({
  customError,
  setErrors,
  errors,
}: CustomErrorHandlerProps<_Shape_>) {
  useEffect(() => {
    if (!customError) {
      return;
    }
    const { fieldName, message } = customError;
    setErrors({ ...errors, [fieldName]: message });
  }, [customError, errors, setErrors]);

  return null;
}
