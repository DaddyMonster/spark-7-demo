import styled from 'styled-components';

export interface SideRendererRootProps {
  topNavHeight: number;
  isMini: boolean;
  rootStyle: Record<string, unknown>;
  rootClassName?: string;
}

export const SideRendererRoot = styled.div<SideRendererRootProps>(
  ({ theme, topNavHeight, isMini, rootStyle }) => ({
    width: '100%',
    height: `calc(100vh - ${topNavHeight}px)`,
    padding: theme.spacing(6, 0, 2, 1),
    boxShadow: theme.shadows[3],
    background: isMini ? theme.palette.primary.main : 'none',
    transition: '300ms background ease',
    ...rootStyle,
  })
);
