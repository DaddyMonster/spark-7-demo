import { Avatar, Paper, Typography } from '@material-ui/core';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { grey } from '@material-ui/core/colors';
import dy from 'dayjs';
export interface SimpleSingleColumnCardProps {
  rootStyle?: Record<string, unknown>;
  height?: number;
  imgUrl?: string;
  mainLabel: string;
  subLabel?: string;
  dateDisplay: Date;
  ImgMisc?: React.ComponentType;
  EndMisc?: React.ComponentType;
}

export function SimpleSingleColumnCard({
  rootStyle = {},
  height = 50,
  EndMisc,
  ImgMisc,
  dateDisplay,
  mainLabel,
  imgUrl,
  subLabel,
}: SimpleSingleColumnCardProps): ReactElement {
  return (
    <Root $rootStyle={rootStyle} height={height}>
      {imgUrl && (
        <div className="h-full relative">
          <Avatar
            src={imgUrl}
            sx={{ width: height * 1.25, height , borderRadius : '5px 0 0 5px' }}
            variant="square"
          />
          {ImgMisc && <ImgMisc />}
        </div>
      )}
      <MainPart>
        <Typography
          fontSize="0.9rem"
          textOverflow="ellipsis"
          flexWrap="nowrap"
          noWrap
          overflow="hidden"
        >
          {mainLabel}
        </Typography>

        <Typography
          sx={{ color: grey[600] }}
          fontSize="0.6rem"
          textOverflow="ellipsis"
          flexWrap="nowrap"
          overflow="hidden"
          noWrap
        >
          {subLabel}
        </Typography>
      </MainPart>

      <div className="h-full px-3 ml-auto flex items-end relative">
        {EndMisc && <EndMisc />}
        <Typography noWrap fontSize="0.8rem" sx={{ color: grey[500], mb: 0.5 }}>
          {dy(dateDisplay).format('YY-MM-DD hh:MM A')}
        </Typography>
      </div>
    </Root>
  );
}

const Root = styled(Paper)<{
  $rootStyle: Record<string, unknown>;
  height: number;
}>(({ theme, $rootStyle, height }) => ({
  width: '100%',
  height,
  flex: '1 0 auto',
  borderRadius: 5,
  boxShadow: theme.shadows[3],
  display: 'flex',
  margin: theme.spacing(1, 1, 0.5),
  minWidth: 0,
  ...$rootStyle,
}));

const MainPart = styled.div(({ theme }) => ({
  padding: theme.spacing(0, 3),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minWidth: 0,
}));
