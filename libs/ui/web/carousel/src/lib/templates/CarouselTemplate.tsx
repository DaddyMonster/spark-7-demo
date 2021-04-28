import {
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { SectionRootWithTitle } from '@hessed/ui/web/layout';
interface CarouselTemplateProps {
  title: string;
  children: JSX.Element | JSX.Element[];
  noListMessage: string;
}

export function CarouselTemplate({
  title,
  children,
  noListMessage,
}: CarouselTemplateProps) {
  const childrenCount = useRef(0);
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between('sm', 'lg')
  );

  // FORCE RERENDER
  const [rerenderKey, setrerenderKey] = useState(0);

  useEffect(() => {
    if (Array.isArray(children) && children.length !== childrenCount.current) {
      childrenCount.current = children.length;
      setrerenderKey(Math.random());
    }
  }, [children]);

  return (
    <SectionRootWithTitle title={title}>
      {!Array.isArray(children) || children.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <Typography>{noListMessage}</Typography>
        </div>
      ) : (
        <Carousel
          slidesToShow={smDown ? 1 : mdDown ? 2 : 3}
          cellSpacing={10}
          key={rerenderKey}
          renderBottomCenterControls={null}
          renderCenterLeftControls={({ previousSlide }) => (
            <IconButton
              onClick={previousSlide}
              style={{ transform: 'translateX(-50px)' }}
            >
              <GrPrevious />
            </IconButton>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <IconButton
              onClick={nextSlide}
              style={{ transform: 'translateX(50px)' }}
            >
              <GrNext />
            </IconButton>
          )}
        >
          {children}
        </Carousel>
      )}
    </SectionRootWithTitle>
  );
}
