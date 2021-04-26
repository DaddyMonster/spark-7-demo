import React from 'react';
import { IconType, IconBaseProps } from 'react-icons';
import { MdVolumeMute, MdVolumeDown, MdVolumeUp } from 'react-icons/md';

export interface VolumeIconProps extends IconBaseProps {
  volume: number;
}

export const VolumeIcon = ({
  volume,
  ...props
}: VolumeIconProps): (() => JSX.Element) => {
  const Icon =
    volume === 0 ? MdVolumeMute : volume < 60 ? MdVolumeDown : MdVolumeUp;
  return () => Icon(props);
};
