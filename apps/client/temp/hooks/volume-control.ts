import React, { useRef, useState } from 'react';

interface Props {
  localVolumeSetter: (vol: number) => void;
}

type UseVolumeControlReturn = [States, Actions];

interface States {
  anchor: HTMLDivElement | null;
}
interface Actions {
  setVolume: (val: number) => void;
  setAnchor: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function useVolumeControl({
  localVolumeSetter,
}: Props): UseVolumeControlReturn {
  const [anchor, setanchor] = useState(null);

  const setVolume = (vol: number) => {
    localVolumeSetter(vol);
    setAnchor(null);
  };

  const setAnchor = (e: React.MouseEvent<HTMLButtonElement>) => {
    setanchor(anchor ? null : e.currentTarget);
  };

  return [{ anchor }, { setVolume, setAnchor }];
}
