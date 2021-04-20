import { createTemplate } from '../../util/create-sb-template';
import { TailwindTest, TailwindTestProps } from './TailwindTest';

export default {
  title: 'TEST/Tailwind-Test',
  component: TailwindTest,
  argTypes: {
    bg: { control: 'color' },
  },
};

export const First = createTemplate<TailwindTestProps>(
  TailwindTest as never,
  {}
);

export const Second = createTemplate<TailwindTestProps>(
  TailwindTest as never,
  {}
);
