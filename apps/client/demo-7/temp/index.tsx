import {
  useAuthAction,
  useSevenAuthStore,
} from '@hessed/client-module/seven-auth';
import { GoogleButton } from '@hessed/ui/web/atom';
import { Container, Grid, Typography } from '@material-ui/core';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { CustomPageType } from '../types/custom-page';

export const Index: CustomPageType = () => {
  const router = useRouter();
  const user = useSevenAuthStore((prev) => prev.user);
  const { login, logout } = useAuthAction(router);
  return (
    <Jumbo>
      <Container maxWidth="lg" sx={{ display: 'flex' }}>
        <Grid container>
          <Grid item xs={12} lg={5}>
            <div className="flex h-full justify-center items-center">
              <Image
                alt="girls on phone"
                src="/svg/girls-over-phone.svg"
                width="500vw"
                height={400}
              />
            </div>
          </Grid>
          <Grid item xs={12} lg={7}>
            <div className="flex-1 relative flex flex-col h-full items-center justify-center">
              <Typography
                className="w-full my-3"
                sx={{
                  color: '#fff',
                  fontSize: '2.3rem',
                  lineHeight: '3rem',
                }}
              >
                전 세계의 사람들과 7분간의 편안한 대화
                <br />
                지금 시작하세요
              </Typography>

              <div className="w-full py-5 lg:ml-auto">
                <GoogleButton
                  onLogin={login}
                  isLogged={Boolean(user)}
                  onLogout={logout}
                  className="px-4"
                />
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Jumbo>
  );
};

Index.layout = 'INDEX_PAGE';

export default Index;

const Jumbo = styled.div(({ theme }) => ({
  background: theme.palette.black.main,
  width: '100%',
  height: '100vh',
  overflow: 'hidden',
  display: 'flex',
  [theme.breakpoints.down('lg')]: {
    marginTop: theme.spacing(5),
  },
}));
