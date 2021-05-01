import React from 'react';

export interface TailwindTestProps {
  outerClass?: string;
  innerClass?: string;
}

export const TailwindTest = ({
  innerClass = '',
  outerClass = '',
}: TailwindTestProps) => {
  return (
    <div className={`bg-red-500 w-32 h-32 ${outerClass}`}>
      <span className={`text-purple-500 ${innerClass}`}>HELLO TAILWIND</span>
    </div>
  );
};
