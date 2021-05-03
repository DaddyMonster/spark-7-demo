import { ComponentLayoutType } from '@hessed/client-lib/custom-types';

import LogAppLayout from './index';

export const getLayoutComponent = (
  layout: ComponentLayoutType<typeof LogAppLayout>
) => {
  if (typeof layout === 'string') return LogAppLayout[layout];

  if (layout) return layout;

  return LogAppLayout.NO_LAYOUT;
};
