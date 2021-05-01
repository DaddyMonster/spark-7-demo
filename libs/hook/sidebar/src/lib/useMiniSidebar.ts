import { useEffect } from 'react';
import { useSideStore } from './useSideStore';

export function useMiniSidebar() {
  const setMiniPage = useSideStore((store) => store.setMiniPage);
  useEffect(() => {
    setMiniPage(true);
    return () => setMiniPage(false);
  }, []);

  return null;
}
