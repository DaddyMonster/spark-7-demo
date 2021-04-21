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
  miniPage: boolean;
  setMiniPage: (bool: boolean) => void;
  forceMiniOnHide: boolean;
  setForceMiniOnHide: (bool: boolean) => void;
};

export const useSideStore = createStore<SideStore>((set) => ({
  sideProperty: DEFAULT_SIDE_PRESET,
  setSideProp: (prop) => set((store) => void (store.sideProperty = prop)),
  sideStatus: 'full',
  setSideStatus: (status) => set((store) => void (store.sideStatus = status)),
  miniPage: false,
  setMiniPage: (bool) => set((store) => void (store.miniPage = bool)),
  forceMiniOnHide: false,
  setForceMiniOnHide: (bool) =>
    set((store) => void (store.forceMiniOnHide = bool)),
}));
