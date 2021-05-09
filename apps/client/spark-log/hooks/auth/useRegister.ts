import { useRegisterMutation } from '@hessed/gql/log-app';
import { FormikHelpers } from 'formik';
import * as yup from 'yup';
import { AuthErrorReason } from '@hessed/gql/log-app';
import { useRouter } from 'next/router';
export interface RegisterValues {
  email: string;
  password: string;
  passCheck: string;
  displayName: string;
  // favorites
}

export const initRegisterValue: RegisterValues = {
  email: '',
  displayName: '',
  passCheck: '',
  password: '',
};

export const validationSchema = yup.object().shape({
  email: yup.string().email().min(6).max(96).required(),
  displayName: yup.string().min(2).max(24).required(),
  password: yup.string().required(),
  passCheck: yup
    .string()
    .test('pasword-match', 'guide here...', function (value) {
      return this.parent.password === value;
    }),
});

export function useRegister() {
  const [register] = useRegisterMutation();
  const router = useRouter();
  const onSubmit = async (
    vals: RegisterValues,
    { setErrors }: FormikHelpers<RegisterValues>
  ) => {
    const { displayName, email, password } = vals;
    const { data } = await register({
      variables: { registerInput: { password, email, displayName } },
    });
    if (data.register.error) {
      switch (data.register.error.reason) {
        case AuthErrorReason.EmailExist:
          return setErrors({ email: data.register.error.message });
        default:
          return alert('Unknown Error');
      }
    } else {
      router.push(`/space/${data.register.user.uid}`);
    }
  };

  return { onSubmit };
}
