import React from 'react';
import { Nation, nationCodeMap } from '@hessed/client-module/seven-shared';
import { NationFlagSquare } from '@hessed/ui/web/atom';
export type CurrentKey = 'learningLang' | 'localLang';

interface PickNationProps {
  currentKey: CurrentKey;
  onPick: (key: CurrentKey, nation: Nation) => void;
  localLang: Nation | null;
}

const PickNation = ({ currentKey, onPick, localLang }: PickNationProps) => {
  const handlePick = (nation: Nation) => {
    if (currentKey === 'learningLang' && nation === localLang) {
      // PROMPT
      alert("You can't have same lanauge for both");
      return;
    }
    onPick(currentKey, nation);
  };

  const nationKeys = Object.keys(nationCodeMap);

  return (
    <div className="flex items-center justify-center">
      {nationKeys.map((x: Nation) => (
        <NationFlagSquare
          key={x}
          nation={x}
          shadow
          size={55}
          className="mr-3"
          onClick={handlePick}
        />
      ))}
    </div>
  );
};

export default PickNation;
