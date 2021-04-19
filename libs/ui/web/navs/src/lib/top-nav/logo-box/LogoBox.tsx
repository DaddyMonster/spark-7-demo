import { Hidden, IconButton } from '@material-ui/core';
import Image from 'next/image';
import React from 'react';
import { HiMenuAlt2 } from 'react-icons/hi';

interface LogoBoxProps {
  logoPath: string;
  onSideToggle: () => void;
  showSideToggle: boolean;
  onLogoClick: () => void;
}

export const LogoBox = ({
  logoPath,
  onSideToggle,
  showSideToggle,
  onLogoClick,
}: LogoBoxProps) => {
  return (
    <div className="flex h-full items-center">
      <Hidden mdUp>
        {showSideToggle && (
          <IconButton onClick={onSideToggle}>
            <HiMenuAlt2 />
          </IconButton>
        )}
      </Hidden>
      <Image
        alt="logo-7"
        src={logoPath}
        width="160px"
        height="50px"
        onClick={onLogoClick}
      />
    </div>
  );
};
