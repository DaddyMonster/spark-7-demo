import { NavRenderItemBase } from '@hessed/ui/shared';
import {
  SideContentProps,
  SideRendererRoot,
  SimpleSideNavItem,
} from '@hessed/ui/web/navs';
import { Box, useTheme } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { BiHome } from 'react-icons/bi';
import { BsBookmarks } from 'react-icons/bs';
import { IoIosRefresh } from 'react-icons/io';
import { useMeQuery } from '../../../../../libs/gql/log-app/src';

const readSideRenderItems: NavRenderItemBase[] = [
  { Icon: BiHome, label: '인기 포스트', route: '/read' },
  { Icon: AiOutlineSearch, label: '포스트 검색', route: '/read/search' },
  { Icon: BsBookmarks, label: '북마크 목록', route: '/read/bookmark' },
  { Icon: IoIosRefresh, label: '최근 본 포스트', route: '/read/recent' },
];
/* const BottomActionBoxHeight = 180; */
const ReadSideRenderer = ({
  sideStatus,
  rootStyle,
  topNavHeight,
}: SideContentProps) => {
  const router = useRouter();
  const theme = useTheme();
  console.log(router.asPath);
  return (
    <SideRendererRoot
      isMini={sideStatus === 'mini'}
      topNavHeight={0}
      rootStyle={{
        ...rootStyle,
        padding: theme.spacing(4, 0),
        /* paddingBottom: BottomActionBoxHeight, */
        /* position: 'relative', */
      }}
    >
      <Box sx={{ px: 2 }}>
        {readSideRenderItems.map((x) => (
          <SimpleSideNavItem
            {...x}
            key={x.route}
            active={router.asPath === x.route}
            onClick={() => router.push(x.route)}
            sideSize={sideStatus}
          />
        ))}
      </Box>
      {/* <ContentFooter></ContentFooter> */}
    </SideRendererRoot>
  );
};

export default ReadSideRenderer;

/* const ContentFooter = styled.div(({ theme }) => ({
  height: BottomActionBoxHeight,
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
}));
 */
