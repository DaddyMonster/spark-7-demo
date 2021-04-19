import { ComponentLayoutType } from '@hessed/client-lib/custom-types';

import SevenLayout from './index';

export const getLayoutComponent = (
  layout: ComponentLayoutType<typeof SevenLayout>
) => {
  if (typeof layout === 'string') return SevenLayout[layout];

  if (layout) return layout;

  return SevenLayout.NO_LAYOUT;
};
