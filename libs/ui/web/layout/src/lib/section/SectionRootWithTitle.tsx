import React from 'react';
import styled from 'styled-components';
export interface SectionRootWithTitleProps {
  title: string;
  children: React.ReactNode;
  TitleMisc?: React.ComponentType;
}

export const SectionRootWithTitle = ({
  children,
  title,
  TitleMisc,
}: SectionRootWithTitleProps) => {
  return (
    <Root>
      <div className="flex items-center">
        <Title>{title}</Title>
        {TitleMisc && <TitleMisc />}
      </div>
      {children}
    </Root>
  );
};

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
