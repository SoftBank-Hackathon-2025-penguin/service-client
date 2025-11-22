import { useRef, useEffect } from 'react';
import styled from 'styled-components';

export const LogViewer = ({ logs }: { logs: string[] }) => {
  const endOfLogsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfLogsRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <Container>
      <Header>
        <Title>📜 デプロイログ</Title>
        <LineCount>{logs.length}ライン</LineCount>
      </Header>
      <LogArea>
        {logs.map((log, index) => (
          <LogLine key={index}>
            <LineNumber>{index + 1}</LineNumber>
            <LogText>{log}</LogText>
          </LogLine>
        ))}
        <div ref={endOfLogsRef} />
      </LogArea>
    </Container>
  );
};

const Container = styled.div`
  background: ${({ theme }) => theme.color.baseColor2};
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.white};
`;

const LineCount = styled.span`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.baseColor6};
`;

const LogArea = styled.div`
  background: #000;
  border-radius: 8px;
  padding: 1rem;
  height: 300px;
  overflow-y: auto;
  font-family: 'SF Mono', 'Menlo', 'monospace';
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.white};
`;

const LogLine = styled.div`
  display: flex;
  align-items: baseline;

  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const LineNumber = styled.span`
  color: ${({ theme }) => theme.color.baseColor5};
  margin-right: 1rem;
  text-align: right;
  min-width: 20px;
  user-select: none;
`;

const LogText = styled.span`
  white-space: pre-wrap;
  word-break: break-all;
`;

