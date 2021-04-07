import { IconButton, Typography } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import Carousel from 'nuka-carousel';
import { GrPrevious, GrNext } from 'react-icons/gr';
interface Props {
  title: string;
  children: React.ReactNode;
}

function CarouselTemplate({ title, children }: Props) {
  return (
    <Root>
      <Title>{title}</Title>
      <Carousel
        slidesToShow={3}
        cellSpacing={10}
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
