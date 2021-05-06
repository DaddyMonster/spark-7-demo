import { useLoginMutation } from '@hessed/gql/log-app';
import { FormikHelpers } from 'formik';
import * as yup from 'yup';

export interface LoginValue {
  email: string;
  password: string;
}

export const initLoginValue: LoginValue = {
  email: '',
  password: '',
};

export const loginValidationSchema = yup.object().shape({
  email: yup.string().email('올바르지 않은 주소입니다.').required('필수 항목'),
  password: yup
    .string()
    .min(4, '4자 이상 입력하세요!')
    .max(12, '12자 이하')
    .required('필수 항목'),
});

export function useLogin() {
  const [login] = useLoginMutation();
  const onSubmit = async (
    { password, email }: LoginValue,
    { setErrors }: FormikHelpers<LoginValue>
  ) => {
    const { data } = await login({
      variables: {
        loginInput: {
          email,
          password,
        },
      },
    });

    if (data.login.error) {
      const { message /* reason */ } = data.login.error;
      alert(message); // MORE LOGICS
      return;
    }
  };
  return { onSubmit };
}
