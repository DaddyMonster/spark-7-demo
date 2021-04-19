import { createStore } from '@hessed/hook/store';
import {
  DEFAULT_SIDE_PRESET,
  SidebarPreset,
  SidebarStatus,
} from './sidebar-preset';

export type SideStore = {
  sideProperty: SidebarPreset;
  sideStatus: SidebarStatus;
  setSideStatus: (status: SidebarStatus) => void;
  setSideProp: (prop: SidebarPreset) => void;
  isMini: boolean;
  toggleMini: (bool: boolean) => void;
};

export const useSideStore = createStore<SideStore>((set) => ({
  sideProperty: DEFAULT_SIDE_PRESET,
  setSideProp: (prop) => set((store) => void (store.sideProperty = prop)),
  sideStatus: 'full',
  setSideStatus: (status) => set((store) => void (store.sideStatus = status)),
  isMini: false,
  toggleMini: (bool) => set((store) => void (store.isMini = bool)),
}));
