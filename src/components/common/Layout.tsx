import type { ReactNode } from 'react';
import styled from 'styled-components';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <Header>
        <Logo>🐧 Penguin-Land</Logo>
        <Subtitle>Terraformベースのワンクリックデプロイ＆モニタリング</Subtitle>
      </Header>
      <Main>{children}</Main>
      <Footer>
        <FooterText>💡 Tip: デプロイ中も安心してお待ちください！</FooterText>
      </Footer>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.color.baseColor9};
`;

const Header = styled.header`
  padding: 1.5rem 2rem;
  background: ${({ theme }) => theme.color.white};
  border-bottom: 2px solid ${({ theme }) => theme.color.baseColor8};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.baseColor2};
  margin: 0;
  margin-bottom: 0.25rem;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.color.baseColor5};
  margin: 0;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const Footer = styled.footer`
  padding: 1rem 2rem;
  background: ${({ theme }) => theme.color.white};
  border-top: 1px solid ${({ theme }) => theme.color.baseColor8};
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.baseColor5};
  margin: 0;
`;

