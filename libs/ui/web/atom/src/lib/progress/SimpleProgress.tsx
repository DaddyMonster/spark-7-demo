import React, { useMemo } from 'react';
import { ColorOptionUnion } from '@hessed/styles/theme';
import styled from 'styled-components';
import color from 'color';
interface SimpleProgressProps {
  max?: number;
  min?: number;
  value: number;
  height?: number;
  radius?: number;
  bg?: ColorOptionUnion;
  color?: ColorOptionUnion;
  ToolTipComponent?: React.ComponentType;
  toolTipOffset?: [number, number];
}

export const SimpleProgress = ({
  value,
  max = 100,
  min = 0,
  height = 15,
  radius = 10,
  color = 'black',
  bg = 'default',
  ToolTipComponent,
  toolTipOffset = [0, 0],
}: SimpleProgressProps) => {
  const percentage = useMemo(() => {
    return (value / (max - min)) * 100;
  }, [max, min, value]);
  return (
    <Root height={height} bg={bg}>
      <Bar percentage={percentage} radius={radius} col={color}>
        <Wrapper>
          {ToolTipComponent && (
            <TooltipWrapper toolTipOffset={toolTipOffset}>
              <ToolTipComponent />
            </TooltipWrapper>
          )}
        </Wrapper>
      </Bar>
    </Root>
  );
};

const Root = styled.div<{ height: number; bg: ColorOptionUnion }>(
  ({ theme, height, bg }) => ({
    width: '100%',
    flexGrow: 1,
    height,
    position: 'relative',
    background: color({ hex: theme.palette[bg].main }).darken(0.05).hex(),
  })
);

const Bar = styled.div<{
  percentage: number;
  radius: number | string;
  col: ColorOptionUnion;
}>(({ theme, percentage, radius, col }) => ({
  width: percentage + '%',
  height: '100%',
  position: 'absolute',
  left: 0,
  top: 0,
  borderRadius: `0 ${radius}px ${radius}px 0`,
  background: theme.palette[col].main,
}));

const Wrapper = styled.div(({ theme }) => ({
  width: '100%',
  position: 'relative',
  height: '100%',
  zIndex: 10,
}));

const TooltipWrapper = styled.div<{ toolTipOffset: [number, number] }>(
  ({ toolTipOffset }) => ({
    position: 'absolute',
    right: toolTipOffset[1],
    top: toolTipOffset[0],
  })
);
