import { alpha, Container, Grid, Paper, Typography } from '@material-ui/core';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { GoogleBtn } from '../components/atoms/button/GoogleBtn';
import { JUMBO_TWO_HEIGHT } from '../constants/layout-sizes';
import { useAuth } from '../hooks/auth';
import { CustomPageType } from '../types/custom-page';
const texts = ['7분간 기적 일어남', '시간 순삭', '등등 효과가 좋다'];

export const Index: CustomPageType = () => {
  const { user } = useAuth();
  const { loginUser, logout } = useAuth();
  return (
    <>
      <Jumbo>
        <Container maxWidth="lg" sx={{ display: 'flex' }}>
          <Grid container>
            <Grid item xs={12} lg={5}>
              <div className="flex h-full justify-center items-center">
                <Image
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
                  전 세계의 사람들과 7분간의 편안한 대화 <br />
                  지금 시작하세요
                </Typography>

                <div className="w-full py-5 lg:ml-auto">
                  <GoogleBtn
                    onLogin={loginUser}
                    isLogged={Boolean(user)}
                    redirectTo="/app/seven/home"
                    onLogout={logout}
                    px={10}
                  />
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Jumbo>

      {/* <div className="p-14 overflow-hidden">
        <Jumbo2>
          <Grid container>
            <Grid item xs={7}>
              <Box className="flex h-full justify-center items-center">
                <motion.div
                  whileHover={{
                    scale: 1.2,
                  }}
                  style={{
                    filter: 'drop-shadow( 3px 3px 4px rgba(0, 0, 0, .7))',
                    borderRadius: '50%',
                  }}
                >
                  <Image src="/svg/global.svg" width="400" height={400} />
                </motion.div>
              </Box>
            </Grid>
            <Grid item xs={5}>
              <div className="h-full flex flex-col justify-center">
                <ul>
                  {texts.map((x) => (
                    <Paper
                      key={x}
                      component="li"
                      style={{
                        marginBottom: 12,
                        borderRadius: 10,
                        background: '#000',
                      }}
                      className="py-5 px-5"
                    >
                      <Typography fontSize="1.6rem" className="text-white">
                        {x}
                      </Typography>
                      <Typography fontSize="1rem" className="text-gray-300">
                        Ad deserunt ut consectetur id commodo ullamco.
                      </Typography>
                    </Paper>
                  ))}
                </ul>
              </div>
            </Grid>
          </Grid>
        </Jumbo2>
      </div> */}
    </>
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
}));

const Jumbo2 = styled(Paper)(({ theme }) => ({
  width: 'calc(100% - 4px)',
  maxWidth: '100%',
  height: JUMBO_TWO_HEIGHT,
  borderRadius: 15,
  padding: theme.spacing(0, 5),
  border: `2px solid ${theme.palette.primary.main}`,
  background: alpha(theme.palette.warning.main, 0.6),
  boxShadow: theme.shadows[6],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
}));
