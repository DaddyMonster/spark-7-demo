import { IconType } from 'react-icons';
import { AiOutlineSchedule, AiOutlineHistory } from 'react-icons/ai';
import { IoPeopleCircleOutline } from 'react-icons/io5';
import { BsFilePlus } from 'react-icons/bs';
import { BiHome } from 'react-icons/bi';
export interface RenderItem {
  label: string;
  route: string;
  Icon: IconType;
}

export const SevenSideItems: RenderItem[] = [
  {
    label: 'Home',
    Icon: BiHome,
    route: '/app/seven/home',
  },
  {
    label: 'Search Topics ',
    Icon: AiOutlineSchedule,
    route: '/app/seven/search-topic',
  },
  {
    label: 'Throw a Topic ',
    Icon: BsFilePlus,
    route: '/app/seven/create-topic',
  },
  {
    label: 'Reservation List',
    Icon: IoPeopleCircleOutline,
    route: '/app/seven/my-reservations',
  },
  {
    label: 'History',
    Icon: AiOutlineHistory,
    route: '/app/seven/history',
  },
];
