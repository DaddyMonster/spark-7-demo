import { TOP_NAV_HEIGHT } from '../../../constants/layout-sizes';
import styled from 'styled-components';
import { alpha } from '@material-ui/core';

export const Root = styled.div<{ transparental?: boolean }>(
  ({ theme, transparental = false }) => ({
    display: 'flex',
    padding: theme.spacing(0, 2),
    boxShadow: theme.shadows[transparental ? 0 : 2],
    height: TOP_NAV_HEIGHT,
    background: alpha('#ffffff', transparental ? 0 : 1),
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 2000,
  })
);
