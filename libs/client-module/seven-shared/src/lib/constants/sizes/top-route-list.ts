import { RiRadioFill } from 'react-icons/ri';
import { AiFillBook } from 'react-icons/ai';
export const TopNavMenuList = [
  {
    href: '/app/seven/home',
    label: 'Seven',
    Icon: RiRadioFill,
    regex: /\/app\/seven/,
  },
  {
    href: '/app/learn/home',
    label: 'Learn',
    Icon: AiFillBook,
    regex: /\/app\/learn/,
  },
];
