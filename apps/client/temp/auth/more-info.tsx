import React, { useMemo, useState } from 'react';
import { useAuth } from '../../hooks/auth';
import styled from 'styled-components';
import { Paper, Container, Typography, Button } from '@material-ui/core';
import { Nation } from '../../types/nation';
import { NationFlag } from '../../components/flag/NationFlag';
import { motion } from 'framer-motion';
import { auth } from '../../lib/firebase-init';
import { useAuthState } from 'react-firebase-hooks/auth';
interface NationChoice {
  nation: Nation;
  label: string;
}
const nationChoices: NationChoice[] = [
  { nation: 'en', label: 'English' },
  { nation: 'ko', label: '한국어' },
];

const messages = [
  'What is your native language?',
  'What language do you want to learn?',
  'Thank you! Lets start talking',
];
const MoreInfo = () => {
  const [user] = useAuthState(auth);
  const { addDetail } = useAuth();
  const [step, setstep] = useState(0);

  const [langs, setlangs] = useState<{
    localLang: Nation | null;
    learningLang: Nation[] | null;
  }>({ localLang: null, learningLang: null });

  const stepHandler = [
    (lang: Nation) => setlangs({ ...langs, localLang: lang }),
    (lang: Nation) => setlangs({ ...langs, learningLang: [lang] }),
  ] as const;

  const handleFlagClick = (lang: Nation) => {
    stepHandler[step](lang);
    setstep(step + 1);
  };

  const onReady = () => {
    if (!validate()) {
      alert('User Auth Messed up! Start from scratch');
      return;
    }
    addDetail({
      ...langs,
      uid: user.uid,
    });
  };

  const validate = (): boolean => {
    if (!user || !user.uid) {
      return false;
    }
    const { localLang, learningLang } = langs;
    if (!localLang || !learningLang || learningLang.length === 0) {
      return false;
    }
    return true;
  };

  return (
    <Root>
      <Container maxWidth="sm">
        <CardLayout>
          <Typography fontSize="1.4rem" className="my-6">
            {messages[step]}
          </Typography>
          <div className="flex items-center">
            {step < 2 ? (
              nationChoices.map(({ label, nation }) => (
                <motion.div
                  whileHover={{
                    scale: 1.1,
                  }}
                  whileTap={{
                    scale: 0.7,
                  }}
                  className="flex flex-col justify-center items-center mr-3"
                  key={nation}
                >
                  <NationFlag
                    nation={nation}
                    sizes={55}
                    onClick={handleFlagClick}
                  />
                  <Typography fontSize="1rem" className="py-2">
                    {label}
                  </Typography>
                </motion.div>
              ))
            ) : (
              <Button variant="contained" onClick={onReady}>
                I'm Ready!
              </Button>
            )}
          </div>
        </CardLayout>
      </Container>
    </Root>
  );
};

export default MoreInfo;

const Root = styled.div(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: theme.palette.primary.main,
}));

const CardLayout = styled(Paper)(({ theme }) => ({
  width: '100%',
  borderRadius: 15,
  minHeight: 250,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
}));
