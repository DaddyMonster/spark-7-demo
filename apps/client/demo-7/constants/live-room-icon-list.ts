import { IconType } from 'react-icons';
import { AiTwotoneTool } from 'react-icons/ai';
import { BsMicMute } from 'react-icons/bs';
import { GiHand } from 'react-icons/gi';
import { IoPeopleCircleOutline, IoVolumeMediumSharp } from 'react-icons/io5';

interface LiveRoomIcon {
  Icon: IconType;
  label: string;
  id: string;
  alwaysVisible: boolean;
}

type LiveRoomId = 'users' | 'tools' | 'hands-up' | 'give-up-mic' | 'volume';

type LiveRoomIconMap = {
  [key in LiveRoomId]: LiveRoomIcon;
};

export const liveRoomIconMap: LiveRoomIconMap = {
  users: {
    label: 'Users',
    alwaysVisible: false,
    id: 'users',
    Icon: IoPeopleCircleOutline,
  },

  tools: {
    label: 'Tools',
    alwaysVisible: true,
    id: 'tools',
    Icon: AiTwotoneTool,
  },
  'hands-up': {
    label: 'Hands up',
    alwaysVisible: true,
    id: 'hands-up',
    Icon: GiHand,
  },
  'give-up-mic': {
    label: 'Give up Mic',
    alwaysVisible: true,
    id: 'give-up-mic',
    Icon: BsMicMute,
  },
  volume: {
    label: 'volume',
    alwaysVisible: true,
    id: 'volume',
    Icon: IoVolumeMediumSharp,
  },
};
