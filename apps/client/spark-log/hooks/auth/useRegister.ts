import { useRegisterMutation } from '@hessed/gql/log-app';
import { FormikHelpers } from 'formik';
import * as yup from 'yup';

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

  const onSubmit = async (
    vals: RegisterValues,
    { setErrors }: FormikHelpers<RegisterValues>
  ) => {
    //some logic
  };

  return { onSubmit };
}
