import { Fade, Popper, Slider, Paper } from '@material-ui/core';
import React, { useState } from 'react';

interface Props {
  anchor: HTMLDivElement;
  setVolume: (val: number) => void;
}

const VolumePopper = ({ anchor, setVolume }: Props) => {
  const [ghost, setghost] = useState(100);
  return (
    <Popper
      open={Boolean(anchor)}
      anchorEl={anchor}
      transition
      placement="bottom"
    >
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={150}>
          <Paper style={{ height: 100 }} className="py-2">
            <Slider
              min={0}
              color="secondary"
              max={100}
              step={5}
              orientation="vertical"
              value={ghost}
              onChange={(_, val) => setghost(val as number)}
              onChangeCommitted={(_, val) => setVolume(val as number)}
            />
          </Paper>
        </Fade>
      )}
    </Popper>
  );
};

export default VolumePopper;
