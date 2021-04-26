import { createStore } from '@hessed/hook/store';
import { AudIndicator, UidMap } from '@hessed/hook/rtc';
import React from 'react';

type UseLiveVolumeStore = {
  volMap: UidMap;
  updateVolMap: (indicator: AudIndicator[]) => void;
};

export const useLiveVolumeStore = createStore<UseLiveVolumeStore>((set) => ({
  volMap: new Map(),
  updateVolMap: (indicator: AudIndicator[]) => {
    const map = new Map();
    indicator.forEach((x) => map.set(x.uid, x.level));
    set((store) => void (store.volMap = map));
  },
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
