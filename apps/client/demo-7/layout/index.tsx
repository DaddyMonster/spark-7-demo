/* eslint-disable @typescript-eslint/no-explicit-any */
import { SevenRenderer } from '../components/side-renderer/SevenRenderer';
import AppLayout from './app-layout';
import { IndexPageLayout } from './index-page-base';
import { NoLayout } from './NoLayout';
import { LayoutWithSidebar } from './with-sidebar';

const AppLayouts = {
  NO_LAYOUT: NoLayout,
  INDEX_PAGE: ({ children, ...props }: any) => (
    <IndexPageLayout {...props}>{children}</IndexPageLayout>
  ),
  APP_LAYOUT: ({ children, ...props }: any) => (
    <AppLayout {...props}>{children}</AppLayout>
  ),
  SEVEN_LAYOUT: ({ children, ...props }: any) => (
    <LayoutWithSidebar SidebarContent={SevenRenderer} {...props}>
      {children}
    </LayoutWithSidebar>
  ),
};

export type AppLayoutType = typeof AppLayouts;
export default AppLayouts;
