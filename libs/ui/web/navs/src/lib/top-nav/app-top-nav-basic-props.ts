import { SimpleTopNavProps } from './SimpleTopNav';

export interface SimpleTopNavLogicProps {
  hideRoutes?: boolean;
  transparental?: boolean;
  showSideToggle?: boolean;
  NavComponent: React.ComponentType<SimpleTopNavProps>;
}
