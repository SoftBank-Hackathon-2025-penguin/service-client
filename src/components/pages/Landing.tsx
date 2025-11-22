import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Layout } from '../common/Layout';
import { Button } from '../common/Button';
import { PATHS } from '../../constants/paths';

export const Landing = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '⚡',
      title: 'ワンクリックデプロイ',
      description: 'ボタン一つで7種類のAWSリソースを自動生成',
    },
    {
      icon: '🐧',
      title: 'ゲーミフィケーション',
      description: 'ペンギンキャラクターがシステム状態を直感的に通知',
    },
    {
      icon: '📊',
      title: 'リアルタイムモニタリング',
      description: 'CloudWatchベースの異常兆候を自動検出',
    },
    {
      icon: '🔧',
      title: '自動ロールバック',
      description: 'デプロイ失敗時にリソースを自動的にクリーンアップ',
    },
  ];

  return (
    <Layout>
      <Container>
        <Hero>
          <HeroIcon>🐧</HeroIcon>
          <HeroTitle>Penguin-Landへようこそ！</HeroTitle>
          <HeroDescription>
            Terraformベースのワンクリックデプロイとペンギンの可愛いコーチングで
            <br />
            クラウドインフラ管理をもっと簡単で楽しく。
          </HeroDescription>
          <ButtonGroup>
            <Button
              size="large"
              onClick={() => navigate(PATHS.DEPLOY)}
            >
              🚀 デプロイを開始する
            </Button>
            <Button
              size="large"
              variant="secondary"
              onClick={() => navigate(PATHS.DASHBOARD)}
            >
              📊 ダッシュボードを見る
            </Button>
          </ButtonGroup>
        </Hero>

        <FeaturesSection>
          <SectionTitle>主な機能</SectionTitle>
          <FeatureGrid>
            {features.map((feature) => (
              <FeatureCard key={feature.title}>
                <FeatureIcon>{feature.icon}</FeatureIcon>
                <FeatureTitle>{feature.title}</FeatureTitle>
                <FeatureDescription>{feature.description}</FeatureDescription>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </FeaturesSection>

        <ResourcesSection>
          <SectionTitle>作成されるAWSリソース</SectionTitle>
          <ResourceList>
            <ResourceItem>🖥️ EC2 Instance (t2.micro)</ResourceItem>
            <ResourceItem>🌐 VPC (ネットワーク分離)</ResourceItem>
            <ResourceItem>🗄️ DynamoDB (NoSQLデータベース)</ResourceItem>
            <ResourceItem>🪣 S3 (静的ファイルストレージ)</ResourceItem>
            <ResourceItem>⚡ Lambda (イベント処理)</ResourceItem>
            <ResourceItem>📊 CloudWatch (ログ＆モニタリング)</ResourceItem>
            <ResourceItem>📢 SNS (通知サービス)</ResourceItem>
          </ResourceList>
        </ResourcesSection>
      </Container>
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Hero = styled.section`
  text-align: center;
  padding: 3rem 2rem;
  background: ${({ theme }) => theme.color.white};
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
`;

const HeroIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${({ theme }) => theme.color.baseColor2};
  margin: 0 0 1rem 0;
`;

const HeroDescription = styled.p`
  font-size: 1.125rem;
  color: ${({ theme }) => theme.color.baseColor5};
  margin: 0 0 2rem 0;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const FeaturesSection = styled.section``;

const SectionTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.baseColor2};
  margin: 0 0 1.5rem 0;
  text-align: center;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const FeatureCard = styled.div`
  padding: 2rem;
  background: ${({ theme }) => theme.color.white};
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.baseColor2};
  margin: 0 0 0.5rem 0;
`;

const FeatureDescription = styled.p`
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.color.baseColor5};
  margin: 0;
  line-height: 1.5;
`;

const ResourcesSection = styled.section`
  padding: 2rem;
  background: ${({ theme }) => theme.color.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const ResourceList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
`;

const ResourceItem = styled.div`
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.color.baseColor9};
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.baseColor2};
  border-left: 4px solid ${({ theme }) => theme.color.primary};
`;

