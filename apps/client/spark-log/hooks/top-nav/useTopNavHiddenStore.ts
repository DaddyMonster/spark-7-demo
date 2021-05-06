import { createStore } from '@hessed/hook/store';
import { useEffect } from 'react';

type TopNavHiddenStore = {
  hideRoot: boolean;
  setHidden: (bool: boolean) => void;
};

export const useTopNavHiddenStore = createStore<TopNavHiddenStore>((set) => ({
  hideRoot: false,
  setHidden: (bool: boolean) => set((store) => void (store.hideRoot = bool)),
}));

export function useHiddenNav(initHidden = false) {
  const setHidden = useTopNavHiddenStore((store) => store.setHidden);
  useEffect(() => {
    setHidden(initHidden);
    return () => setHidden(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showTopnav = () => {
    setHidden(false);
  };
  const hideTopNav = () => {
    setHidden(true);
  };
  return { showTopnav, hideTopNav };
}
