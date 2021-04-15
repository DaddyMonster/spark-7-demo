import { createTemplate } from '../../util/create-sb-template';
import { StorybookSeven, StorybookSevenProps } from './MuiTest';

export default {
  title: 'TEST/MUI-TYPO',
  component: StorybookSeven,
  argTypes: {
    bg: { control: 'color' },
  },
};

export const First = createTemplate<StorybookSevenProps>(
  StorybookSeven as never,
  { color: 'red' }
);

export const Second = createTemplate<StorybookSevenProps>(
  StorybookSeven as never,
  { color: 'purple' }
);
