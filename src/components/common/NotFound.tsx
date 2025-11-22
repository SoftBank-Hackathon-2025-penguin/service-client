import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from './Button';
import { Layout } from './Layout';
import { PATHS } from '../../constants/paths';

/**
 * 404ページコンポーネント
 */
export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Container>
        <Icon>🐧❓</Icon>
        <Title>404 - ページが見つかりません</Title>
        <Description>
          ペンギンが道に迷ってしまいました！
          <br />
          リクエストされたページは存在しません。
        </Description>
        <ButtonGroup>
          <Button size="large" onClick={() => navigate(PATHS.MAIN)}>
            ホームに戻る
          </Button>
          <Button
            size="large"
            variant="secondary"
            onClick={() => navigate(-1)}
          >
            前のページへ
          </Button>
        </ButtonGroup>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
  text-align: center;
`;

const Icon = styled.div`
  font-size: 6rem;
  margin-bottom: 1.5rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.baseColor2};
  margin: 0 0 1rem 0;
`;

const Description = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.color.baseColor5};
  margin: 0 0 2rem 0;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

