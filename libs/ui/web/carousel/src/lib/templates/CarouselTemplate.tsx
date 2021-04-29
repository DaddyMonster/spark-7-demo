import {
  SectionRootWithTitle,
  SectionRootWithTitleProps,
} from '@hessed/ui/web/layout';
import {
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import Carousel from 'nuka-carousel';
import React, { useEffect, useRef, useState } from 'react';
import { GrNext, GrPrevious } from 'react-icons/gr';
interface CarouselTemplateProps extends SectionRootWithTitleProps {
  children: JSX.Element | JSX.Element[];
  noListMessage: string;
  responsiveShowArr?: [number, number, number];
}

export function CarouselTemplate({
  title,
  children,
  noListMessage,
  TitleMisc,
  responsiveShowArr = [1, 2, 3],
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
  const [sm, md, lg] = responsiveShowArr;
  return (
    <SectionRootWithTitle title={title} TitleMisc={TitleMisc}>
      {!Array.isArray(children) || children.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <Typography>{noListMessage}</Typography>
        </div>
      ) : (
        <Carousel
          slidesToShow={smDown ? sm : mdDown ? md : lg}
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
