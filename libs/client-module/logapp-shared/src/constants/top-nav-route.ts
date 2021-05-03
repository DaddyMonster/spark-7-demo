import { RiRadioFill } from 'react-icons/ri';
import { AiFillBook } from 'react-icons/ai';
export const LogAppTopNavMenuList = [
  {
    href: '/read',
    label: 'Read',
    Icon: RiRadioFill,
    regex: /read/,
  },
  {
    href: '/space',
    label: 'Space',
    Icon: AiFillBook,
    regex: /space/,
  },
];
