import { createTemplate } from '@hessed/storybook/seven';
import { NavRoute, NavRouteProps } from './NavRoute';
import { TopNavMenuList } from '@hessed/client-module/seven-shared';
export default {
  title: 'Nav/Top-nav/Route-box',
  component: NavRoute,
  argTypes: {
    bg: { control: 'color' },
  },
};

export const Show = createTemplate<NavRouteProps>(NavRoute as never, {
  hidden: false,
  onRouteClick: (path) => console.log('Nav to ' + path),
  routeAsPath: '/some-path',
  topMenuList: TopNavMenuList,
});

export const HiddenOnHome = createTemplate<NavRouteProps>(NavRoute as never, {
  hidden: false,
  onRouteClick: (path) => console.log('Nav to ' + path),
  routeAsPath: '/',
  topMenuList: TopNavMenuList,
});
