import { UidMap } from '@hessed/hook/rtc';
import { createStore } from '@hessed/hook/store';
import React from 'react';

type UseLiveVolumeStore = {
  volMap: UidMap;
  updateVolMap: (uidMap: UidMap) => void;
};

export const useLiveVolumeStore = createStore<UseLiveVolumeStore>((set) => ({
  volMap: new Map(),
  updateVolMap: (uidMap) => set((store) => void (store.volMap = uidMap)),
}));

type UseLocalVolumeControl = {
  volume: number;
  anchor: HTMLElement | null;
  setVolume: (vol: number) => void;
  setAnchor: (e?: React.MouseEvent<HTMLButtonElement>) => void;
};

export const useLocalVolumeStore = createStore<UseLocalVolumeControl>(
  (set, get) => ({
    volume: 100,
    anchor: null,
    setAnchor: (e) => {
      if (get().anchor || !e) {
        set((store) => void (store.anchor = null));
        return;
      }
      set((store) => void (store.anchor = e.currentTarget));
    },
    setVolume: (vol) => set((store) => void (store.volume = vol)),
  })
);
