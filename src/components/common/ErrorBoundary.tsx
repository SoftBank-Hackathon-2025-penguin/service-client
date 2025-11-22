import { Component } from 'react';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import { Button } from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * エラーバウンダリーコンポーネント
 * Reactコンポーネントツリー内で発生するエラーをキャッチしてフォールバックUIを表示
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorContainer>
          <ErrorIcon>🐧💥</ErrorIcon>
          <ErrorTitle>おっと！ペンギンが滑ってしまいました</ErrorTitle>
          <ErrorMessage>
            予期せぬエラーが発生しました。
            <br />
            {this.state.error?.message}
          </ErrorMessage>
          <ButtonGroup>
            <Button onClick={this.handleReset}>ホームに戻る</Button>
            <Button variant="secondary" onClick={() => window.location.reload()}>
              更新
            </Button>
          </ButtonGroup>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background: ${({ theme }) => theme.color.baseColor9};
`;

const ErrorIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 1.5rem;
`;

const ErrorTitle = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.baseColor2};
  margin: 0 0 1rem 0;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.baseColor5};
  text-align: center;
  margin: 0 0 2rem 0;
  line-height: 1.6;
  max-width: 500px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
`;

