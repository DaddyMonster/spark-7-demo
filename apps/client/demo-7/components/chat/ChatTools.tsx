import { ActivableIconButton, VolumeIcon } from '@hessed/ui/web/atom';
import { Paper, Theme, useMediaQuery } from '@material-ui/core';
import Color from 'color';
import { Translate } from 'next-translate';
import React from 'react';
import { AiOutlineAlert, AiOutlineTranslation } from 'react-icons/ai';
import { BiMessageMinus } from 'react-icons/bi';
import { IoHandLeftSharp, IoPeopleCircleOutline } from 'react-icons/io5';
import { VscOpenPreview } from 'react-icons/vsc';
import styled from 'styled-components';
import { useChatSideStore } from '../../hooks/chat';
import { useAlert } from '../../hooks/chat/useAlert';
import { useHandsUpStore } from '../../hooks/chat/useHandUp';
import { useHideChatStore } from '../../hooks/chat/useHideChatStore';
import { useTranslationStore } from '../../hooks/chat/useTranslationStore';
import { useLocalVolumeStore } from '../../hooks/chat/useVolumeStore';

interface ChatToolsProps {
  t: Translate;
}
export const CHAT_TOOL_HEIGHT = 80;
export const ChatTools = ({ t }: ChatToolsProps) => {
  const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('lg'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const { detailSide, setSide, userSide } = useChatSideStore();
  const { volume, anchor, setAnchor, setVolume } = useLocalVolumeStore();
  const { handUp, setHandUp } = useHandsUpStore();
  const { setTransOn, transOn } = useTranslationStore();
  const { hideChat, setHideChat } = useHideChatStore();
  const { onAlert } = useAlert();
  return (
    <ToolBoxWrap>
      <ToolBox>
        {mdDown && (
          <ActivableIconButton
            Icon={IoPeopleCircleOutline}
            id="show-user"
            activeColUni="danger"
            defaultColor="#fff"
            onClick={() => setSide('userSide')}
            active={userSide}
            tooltipLabel={t(`show-user-${'on'}`)}
          />
        )}
        <ActivableIconButton
          Icon={IoHandLeftSharp}
          id="hand-up"
          activeColUni="danger"
          defaultColor="#fff"
          active={handUp}
          onClick={() => setHandUp('uid')}
          tooltipLabel={t(`ask-for-voice-${'on'}`)}
        />
        <ActivableIconButton
          Icon={AiOutlineTranslation}
          id="auto-translate"
          activeColUni="danger"
          active={transOn}
          defaultColor="#fff"
          onClick={setTransOn}
          tooltipLabel={t(`auto-trans-${'on'}`)}
        />
        <ActivableIconButton
          Icon={BiMessageMinus}
          id="hide-chat"
          activeColUni="danger"
          active={hideChat}
          defaultColor="#fff"
          onClick={setHideChat}
          tooltipLabel={t(`hide-chat-${'on'}`)}
        />
        <ActivableIconButton
          Icon={AiOutlineAlert}
          id="chat-alert"
          active={false}
          activeColUni="danger"
          defaultColor="#fff"
          onClick={onAlert}
          tooltipLabel={t(`chat-alert-${'on'}`)}
        />
        <ActivableIconButton
          Icon={VolumeIcon({ volume: 50 })}
          id="chat-volume"
          active={Boolean(anchor)}
          activeColUni="danger"
          defaultColor="#fff"
          onClick={({ e }) => setAnchor(e)}
          tooltipLabel={t(`chat-volume`)}
        />
        {lgDown && (
          <ActivableIconButton
            Icon={VscOpenPreview}
            id="show-detail"
            active={detailSide}
            activeColUni="danger"
            defaultColor="#fff"
            onClick={() => setSide('detailSide')}
            tooltipLabel={t(`show-detail-${'on'}`)}
          />
        )}
      </ToolBox>
    </ToolBoxWrap>
  );
};

const ToolBoxWrap = styled.div(({ theme }) => ({
  width: '100%',
  height: CHAT_TOOL_HEIGHT,
  padding: theme.spacing(2, 3),
}));

const ToolBox = styled(Paper)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%',
  height: 50,
  borderRadius: 15,
  background: Color(theme.palette.black.main).lighten(0.3).hex(),
  boxShadow: theme.shadows[3],
  '& svg': {
    fill: '#fff',
  },
}));
