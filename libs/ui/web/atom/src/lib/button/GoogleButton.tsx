import React from 'react';
import { CSSObject } from 'styled-components';
import { FcGoogle } from 'react-icons/fc';
import { IoIosPaperPlane } from 'react-icons/io';
import { Button, Theme, useMediaQuery } from '@material-ui/core';

export interface GoogleButtonProps {
  isLogged: boolean;
  onLogin: () => void;
  onLogout: () => void;
  btnStyle?: CSSObject;
  className?: string;
  variant?: 'text' | 'outlined' | 'contained';
}

export function GoogleButton({
  isLogged,
  onLogin,
  onLogout,
  btnStyle = {},
  className = '',
  variant = 'contained',
}: GoogleButtonProps) {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const googleLoginMsg = smDown ? 'Login' : 'Start with Google';
  const goAppMsg = 'Logout';

  const handleClick = () => {
    if (isLogged) {
      onLogout();
    } else {
      onLogin();
    }
  };

  return (
    <Button
      onClick={handleClick}
      variant={variant}
      className={className}
      sx={{ fontSize: '0.8rem', ...btnStyle }}
      startIcon={isLogged ? <IoIosPaperPlane /> : <FcGoogle />}
    >
      {isLogged ? goAppMsg : googleLoginMsg}
    </Button>
  );
}
