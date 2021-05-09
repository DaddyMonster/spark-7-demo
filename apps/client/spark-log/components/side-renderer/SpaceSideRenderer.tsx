import React, { useMemo } from 'react';
import { SideContentProps, SideRendererRoot } from '@hessed/ui/web/navs';
import styled, { useTheme } from 'styled-components';
import { Avatar, Typography } from '@material-ui/core';
import { useMeQuery } from '@hessed/gql/log-app';
import { grey } from '@material-ui/core/colors';
import { NavRenderItemBase } from '@hessed/ui/shared';
import { ImProfile } from 'react-icons/im';
import { RiFileList3Line } from 'react-icons/ri';
import { BiHome } from 'react-icons/bi';
import { SimpleSideNavItem } from '@hessed/ui/web/navs';
import { useRouter } from 'next/router';

const spaceSideRenderItems: NavRenderItemBase[] = [
  { Icon: BiHome, label: 'My Space', route: '' },
  { Icon: ImProfile, label: '프로필 관리', route: '/profile' },
  { Icon: RiFileList3Line, label: '포스트 관리', route: 'posts' },
];

const SpaceSideRenderer = ({
  sideStatus,
  rootStyle,
}: SideContentProps) => {
  const { data } = useMeQuery();
  const router = useRouter();
  const renderItemLists = useMemo(() => {
    if (!data?.me?.user) {
      return [];
    }
    return spaceSideRenderItems.map((x) => {
      return { ...x, route: `/space/${data.me.user.uid}` + x.route };
    });
  }, [data]);
  const theme = useTheme();

  return (
    <SideRendererRoot
      isMini={sideStatus === 'mini'}
      topNavHeight={0}
      rootStyle={{ ...rootStyle, padding: theme.spacing(4, 2) }}
    >
      <ProfileBox>
        <Avatar
          sx={{ width: 100, height: 100 }}
          src={data?.me?.user?.photoURL}
          alt={data?.me?.user?.displayName}
        />
        <Typography fontSize="1.3rem">{data?.me?.user?.displayName}</Typography>
        <Typography fontSize="0.8rem" sx={{ color: grey[600] }}>
          {data?.me?.user?.profession}
        </Typography>
      </ProfileBox>
      {renderItemLists.map((x) => (
        <SimpleSideNavItem
          {...x}
          key={x.route}
          active={router.asPath === x.route}
          onClick={() => router.push(x.route)}
          sideSize={sideStatus}
        />
      ))}
    </SideRendererRoot>
  );
};

export default SpaceSideRenderer;

export const ProfileBoxHeight = 180;
const ProfileBox = styled.div(({ theme }) => ({
  width: '100%',
  height: ProfileBoxHeight,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));
