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
interface Props {
  title: string;
  children: React.ReactNode | React.ReactNode[];
  noList?: string;
}

function CarouselTemplate({ title, children, noList }: Props) {
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
    <Root>
      <Title>{title}</Title>
      {noList ? (
        <div className="flex justify-center items-center h-40">
          <Typography>{noList}</Typography>
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
    </Root>
  );
}

export default CarouselTemplate;

const Root = styled.div(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const Title = styled.span(({ theme }) => ({
  display: 'inline-block',
  fontSize: '0.9rem',
  transform: 'rotate(-3deg) translateX(-30px)',
  background: theme.palette.primary.main,
  boxShadow: '5px 5px 0px 0px rgba(0,0,0,0.71)',
  color: '#fff',
  padding: theme.spacing(1, 2),
  margin: theme.spacing(2, 0.5),
}));
