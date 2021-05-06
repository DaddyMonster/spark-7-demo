/* eslint-disable @typescript-eslint/no-explicit-any */
import { LayoutWithSidebar } from '@hessed/ui/web/layout';
import { AnimatedLayout } from './AnimatedLayout';
import { AppBaseLayout } from './AppBaseLayout';
const LogAppLayout = {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  NO_LAYOUT: ({ children, ...props }: any) => <>{children}</>,
  APP_LAYOUT: ({ children, ...props }: any) => {
    return <AppBaseLayout {...props}>{children}</AppBaseLayout>;
  },
  SEVEN_NORMAL_LAYOUT: ({ children, ...props }: any) => {
    return <LayoutWithSidebar {...props}>{children}</LayoutWithSidebar>;
  },
  ANIMATED_LAYOUT: ({ children, ...props }: any) => {
    return <AnimatedLayout {...props}>{children}</AnimatedLayout>;
  },
} as const;

export default LogAppLayout;
