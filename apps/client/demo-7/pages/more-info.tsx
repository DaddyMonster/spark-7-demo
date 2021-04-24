import { auth } from '@hessed/client-lib/firebase';
import { ChatTagUnion } from '@hessed/client-module/chat-tag';
import { useSevenAuth } from '@hessed/client-module/seven-auth';
import {
  Nation,
  StepKey,
  stepKeys,
  TR_MoreInfoMessage,
} from '@hessed/client-module/seven-shared';
import { SimpleProgress } from '@hessed/ui/web/atom';
import { Button, Typography } from '@material-ui/core';
import produce, { enableMapSet } from 'immer';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GrPrevious } from 'react-icons/gr';
import styled from 'styled-components';
import { PickInterests, PickNation, CurrentKey } from '../components/more-info';

/* import loadNamespaces from 'next-translate/loadNamespaces'; */

enableMapSet();

interface StepValue {
  localLang: Nation;
  learningLang: Nation;
  interests: Set<ChatTagUnion>;
}

const _INIT_STEP_VALUE_: StepValue = {
  localLang: null,
  learningLang: null,
  interests: new Set<ChatTagUnion>(),
};

const MoreInfo = () => {
  const [user] = useAuthState(auth);
  const { t } = useTranslation('more-info');
  const { register } = useSevenAuth();
  const [stepValues, setstepValues] = useState(_INIT_STEP_VALUE_);
  const [que, setque] = useState(0);
  const router = useRouter();

  const stepKey = useMemo(() => stepKeys[que], [que]);
  const message = useMemo(() => TR_MoreInfoMessage[stepKey], [stepKey]);

  const onNext = () => {
    if (!stepValues[stepKey] || que === 3) {
      return;
    }

    setque((prev) => prev + 1);
  };

  const onPrev = () => {
    if (que === 0) {
      return;
    }

    setque((prev) => prev - 1);
  };

  const onPickNation = (stepKey: StepKey, nation: Nation) => {
    setstepValues({
      ...stepValues,
      [stepKey]: nation,
    });
    onNext();
  };

  const PickInterest = (topic: ChatTagUnion) => {
    const { interests } = stepValues;
    setstepValues(
      produce((state: StepValue) => {
        interests.has(topic)
          ? state.interests.delete(topic)
          : state.interests.add(topic);
      })
    );
  };

  const onPickInterestSubmit = () => {
    const { interests } = stepValues;
    if (interests.size < 10) {
      // PROMPT
      return;
    }
    onNext();
  };

  const onGoApp = () => {
    // SOME VALIDATION
    register({ ...stepValues, interests: [...stepValues.interests] }, user);
    router.push('/app/seven/home');
  };

  return (
    <>
      <SimpleProgress value={que + 1} max={5} min={0} />
      <Root>
        <PrevIcon onClick={onPrev}>
          <GrPrevious color="#fff" />
        </PrevIcon>
        <div className="relative flex justify-center items-center flex-col">
          <Typography className="mb-4 relative" fontSize="1.7rem">
            {t(`${message}`)}
          </Typography>
          {(stepKey === 'learningLang' || stepKey === 'localLang') && (
            <PickNation
              currentKey={stepKey as CurrentKey}
              localLang={stepValues.localLang}
              onPick={onPickNation}
            />
          )}
          {stepKey === 'interests' && (
            <PickInterests
              picked={stepValues.interests}
              onPick={PickInterest}
              onSubmit={onPickInterestSubmit}
            />
          )}
          {stepKey === 'goApp' && (
            <div>
              <Button variant="contained" className="px-8" onClick={onGoApp}>
                {t('start-btn')}
              </Button>
            </div>
          )}
        </div>
      </Root>
    </>
  );
};
export default MoreInfo;

const Root = styled.div(({ theme }) => ({
  width: '100%',
  height: 'calc(100vh - 15px)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: theme.palette.default.main,
  position: 'relative',
}));

const PrevIcon = styled.span(({ theme }) => ({
  width: 50,
  height: 50,
  borderRadius: '50%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: theme.shadows[3],
  background: theme.palette.secondary.main,
  position: 'absolute',
  zIndex: 50,
  left: 20,
  top: 30,
  color: '#fff',
  cursor: 'pointer',
  '&: svg': {
    fill: '#fff',
  },
}));
