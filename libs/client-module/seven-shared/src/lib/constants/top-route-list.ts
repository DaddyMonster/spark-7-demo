import { RiRadioFill } from 'react-icons/ri';
import { AiFillBook } from 'react-icons/ai';
import { IconType } from 'react-icons/lib';

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
