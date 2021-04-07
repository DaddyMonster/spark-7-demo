import { useMemo } from 'react';
import shallow from 'zustand/shallow';
import { createStore } from '../../lib/createStore';

export enum LeftSidebarSizeEnum {
  'Hidden' = 'Hidden',
  'Mini' = 'Mini',
  'Normal' = 'Normal',
}
export type SidebarSizeMap = {
  [key in LeftSidebarSizeEnum]: number;
};

export const DEFAULT_SIDEBAR_SIZE_MAP: SidebarSizeMap = {
  [LeftSidebarSizeEnum.Hidden]: 5,
  [LeftSidebarSizeEnum.Mini]: 50,
  [LeftSidebarSizeEnum.Normal]: 280,
};

type SizeSetter = (newSize: LeftSidebarSizeEnum) => void;
type LeftSideSizeStore = {
  size: LeftSidebarSizeEnum;
  setSize: SizeSetter;
};

export const useLeftSideSizeStore = createStore<LeftSideSizeStore>((set) => ({
  size: LeftSidebarSizeEnum.Normal,
  setSize: (newSize) => set((state) => void (state.size = newSize)),
}));

interface LeftSideStates {
  width: number;
  size: LeftSidebarSizeEnum;
}

export type UseLeftSideStoreReturn = [LeftSideStates, SizeSetter];

export function useLeftSideStore(
  sideMap: SidebarSizeMap = DEFAULT_SIDEBAR_SIZE_MAP
): UseLeftSideStoreReturn {
  const { setSize, size } = useLeftSideSizeStore((state) => state, shallow);
  const width = useMemo(() => sideMap[size], [sideMap, size]);
  return [{ width, size }, setSize];
}
