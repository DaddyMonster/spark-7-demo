/* eslint-disable @typescript-eslint/no-explicit-any */
import { LayoutWithSidebar } from '@hessed/ui/web/layout';
import ReadSideRenderer from '../components/side-renderer/ReadSideRenderer';
import SpaceSideRenderer from '../components/side-renderer/SpaceSideRenderer';
import WriteSideRenderer from '../components/side-renderer/WriteSideRenderer';
import { AnimatedLayout } from './AnimatedLayout';
import { AppBaseLayout } from './AppBaseLayout';
import WithSidebar from './WithSidebar';
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
  SPACE_LAYOUT: ({ children, ...props }: any) => {
    return (
      <WithSidebar SidebarContent={SpaceSideRenderer} {...props}>
        {children}
      </WithSidebar>
    );
  },
  READ_LAYOUT: ({ children, ...props }: any) => {
    return (
      <WithSidebar SidebarContent={ReadSideRenderer} {...props}>
        {children}
      </WithSidebar>
    );
  },
  WRITE_LAYOUT: ({ children, ...props }: any) => {
    return (
      <WithSidebar SidebarContent={WriteSideRenderer} {...props}>
        {children}
      </WithSidebar>
    );
  },
} as const;

export default LogAppLayout;
