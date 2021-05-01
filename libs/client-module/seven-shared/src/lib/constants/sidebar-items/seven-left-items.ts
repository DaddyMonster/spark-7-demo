import { IconType } from 'react-icons';
import { AiOutlineHistory, AiOutlineSchedule } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';
import { BsFilePlus } from 'react-icons/bs';
import { IoIosPeople } from 'react-icons/io';
export interface RenderItem {
  label: string;
  route: string;
  Icon: IconType;
  regex?: RegExp;
}

export const SevenSideItems: RenderItem[] = [
  {
    label: 'Home',
    Icon: BiHome,
    route: '/app/seven/home',
  },
  {
    label: 'Social',
    Icon: IoIosPeople,
    route: '/app/seven/social',
  },
  {
    label: 'Learn & Teach',
    Icon: AiOutlineSchedule,
    route: '/app/seven/learn-and-teach',
  },
  {
    label: 'Throw a Topic',
    Icon: BsFilePlus,
    route: '/app/seven/create-topic',
  },
  {
    label: 'My Activity',
    Icon: AiOutlineHistory,
    route: '/app/seven/activity-log',
  },
];
