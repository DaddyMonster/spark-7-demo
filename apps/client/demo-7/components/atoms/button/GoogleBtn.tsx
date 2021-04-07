import { Button } from '@material-ui/core';
import { useRouter } from 'next/router';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { IoIosPaperPlane } from 'react-icons/io';
interface Props {
  isLogged: boolean;
  onLogin: () => void;
  onLogout: (cb?: () => void) => void;
  redirectTo: string;
  px?: number;
  showLogout?: boolean;
}

export const GoogleBtn = ({
  isLogged,
  onLogin,
  redirectTo,
  px = 6,
  onLogout,
  showLogout = false,
}: Props) => {
  const router = useRouter();
  const onClick = () => {
    if (isLogged) {
      router.push(redirectTo);
    } else {
      onLogin();
    }
  };
  return (
    <>
      <Button
        variant="contained"
        className={`px-${px}`}
        sx={{ fontSize: '0.8rem' }}
        onClick={onClick}
        startIcon={isLogged ? <IoIosPaperPlane /> : <FcGoogle />}
      >
        {isLogged ? "Let's Talk" : 'Start with Google'}
      </Button>
      {isLogged && showLogout && (
        <Button
          onClick={() => onLogout()}
          variant="contained"
          className="mx-1"
          sx={{ fontSize: '0.7rem' }}
        >
          Logout
        </Button>
      )}
    </>
  );
};
