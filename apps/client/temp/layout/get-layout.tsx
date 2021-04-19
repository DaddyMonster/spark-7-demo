import AppLayouts, { AppLayoutType } from '.';
import { ComponentLayoutType } from '../types/custom-page';
import { NoLayout } from './NoLayout';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getLayoutComponent = (layout: ComponentLayoutType<any>) => {
  if (typeof layout === 'string')
    return AppLayouts[layout as keyof AppLayoutType];

  if (layout) return layout;

  return NoLayout;
};
