import styled from 'styled-components';
import type { ResourceInfo } from '../../types/deploy';

export const ResourcePanel = ({ resources }: { resources: ResourceInfo }) => {
  const resourceItems = [
    {
      icon: '🖥️',
      label: 'EC2インスタンスID',
      value: resources.ec2InstanceId,
    },
    {
      icon: '🌐',
      label: 'EC2パブリックIP',
      value: resources.ec2PublicIp,
      isLink: true,
    },
    { icon: '🔗', label: 'VPC ID', value: resources.vpcId },
    {
      icon: '🗄️',
      label: 'DynamoDBテーブル',
      value: resources.dynamoDbTableName,
    },
    { icon: '🪣', label: 'S3バケット', value: resources.s3BucketName },
    {
      icon: '⚡',
      label: 'Lambda関数',
      value: resources.lambdaFunctionName,
    },
    { icon: '📢', label: 'SNSトピックARN', value: resources.snsTopicArn },
  ];

  return (
    <Container>
      <Title>AWSリソース情報</Title>
      <Grid>
        {resourceItems.map((item) => (
          <ResourceItemCard key={item.label}>
            <Icon>{item.icon}</Icon>
            <Content>
              <Label>{item.label}</Label>
              <Value>
                {item.isLink ? (
                  <a
                    href={`http://${item.value}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.value}
                  </a>
                ) : (
                  item.value
                )}
              </Value>
            </Content>
          </ResourceItemCard>
        ))}
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.baseColor2};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
`;

const ResourceItemCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.color.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const Icon = styled.div`
  font-size: 2rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow: hidden;
`;

const Label = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.baseColor5};
`;

const Value = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.color.baseColor2};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  & > a {
    color: ${({ theme }) => theme.color.primary};
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

