import type { ReactNode } from 'react';
import styled from 'styled-components';

interface CardProps {
  children: ReactNode;
  title?: string;
  padding?: string;
}

export const Card = ({ children, title, padding = '1.5rem' }: CardProps) => {
  return (
    <Container $padding={padding}>
      {title && <Title>{title}</Title>}
      {children}
    </Container>
  );
};

const Container = styled.div<{ $padding: string }>`
  background: ${({ theme }) => theme.color.white};
  border-radius: 12px;
  padding: ${({ $padding }) => $padding};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.baseColor2};
  margin: 0 0 1rem 0;
`;

