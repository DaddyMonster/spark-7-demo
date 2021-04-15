import { createTemplate } from '../../util/create-sb-template';
import { StyledTest, StyledTestProps } from './StyledTest';

export default {
  title: 'TEST/STYLED-COMPONENT',
  component: StyledTest,
  argTypes: {
    bg: { control: 'color' },
  },
};

export const First = createTemplate<StyledTestProps>(StyledTest as never, {
  sz: 50,
});

export const Second = createTemplate<StyledTestProps>(StyledTest as never, {
  sz: 35,
});
