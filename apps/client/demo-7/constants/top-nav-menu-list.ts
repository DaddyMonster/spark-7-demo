import { IconType } from 'react-icons';
import { RiRadioFill } from 'react-icons/ri';
import { AiFillBook } from 'react-icons/ai';
export interface TopNavMenuListItem {
  href: string;
  label: string;
  Icon: IconType;
}

export const TopNavMenuList: TopNavMenuListItem[] = [
  {
    href: '/app/seven/home',
    label: 'Seven',
    Icon: RiRadioFill,
  },
  {
    href: '/app/learn/home',
    label: 'Learn',
    Icon: AiFillBook,
  },
];
