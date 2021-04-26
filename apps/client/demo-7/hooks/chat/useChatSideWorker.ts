import { Theme, useMediaQuery } from '@material-ui/core';
import { useEffect } from 'react';
import { useChatSideStore } from './useChatSideStore';

export function useChatSideWorker() {
  const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('lg'));
  const mdUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const { detailSide, setSide, userSide } = useChatSideStore();

  useEffect(() => {
    if (userSide) {
      setSide('userSide');
    }
  }, [lgUp]);

  useEffect(() => {
    if (detailSide) {
      setSide('detailSide');
    }
  }, [mdUp]);

  return null;
}
