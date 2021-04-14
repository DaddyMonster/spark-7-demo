import { createTemplate } from '../stroy-util';
import { SampleWelcome, SampleWelcomeProps } from './SampleWelcome';

export default {
  title: 'Sample/Welcome',
  component: SampleWelcome,
  argTypes: {
    bg: { control: 'color' },
  },
};

export const Primary = createTemplate<SampleWelcomeProps>(
  SampleWelcome as never,
  {
    color: 'red',
    fontSize: 32,
  }
);

export const Danger = createTemplate<SampleWelcomeProps>(
  SampleWelcome as never,
  {
    color: 'blue',
    fontSize: 28,
  }
);
