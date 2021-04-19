/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomAppLayoutType } from '@hessed/client-lib/custom-types';

const SevenLayout = {
  NO_LAYOUT: ({ children, ...props }: any) => <>{children}</>,
  INDEX_PAGE: ({ children, ...props }: any) => <div>{children}</div>,
} as const;

export default SevenLayout;
