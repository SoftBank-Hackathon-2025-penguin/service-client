import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { penguinCelebration } from '../../utils/confetti';
import { Layout } from '../common/Layout';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { Toast } from '../common/Toast';
import { ProgressBar } from '../deploy/ProgressBar';
import { LogViewer } from '../deploy/LogViewer';
import { ResourcePanel } from '../deploy/ResourcePanel';
import { useDeployStore } from '../../stores/deployStore';
import { useDeployPolling } from '../../hooks/useDeployPolling';
import { createDeploy, getResources, destroyDeploy } from '../../api/deploy';
import { PATHS } from '../../constants/paths';

export const DeployPage = () => {
  const navigate = useNavigate();
  const {
    sessionId,
    deployState,
    progress,
    currentStage,
    logs,
    resources,
    error,
    setSessionId,
    setResources,
    setError,
    reset,
  } = useDeployStore();

  const { startPolling } = useDeployPolling();

  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  const [isCreating, setIsCreating] = useState(false);
  const [isDestroying, setIsDestroying] = useState(false);

  /**
   * デプロイ作成
   */
  const handleCreate = async () => {
    if (deployState === 'APPLYING' || deployState === 'PLANNING') {
      setToast({
        message: 'デプロイは既に進行中です',
        type: 'error',
      });
      return;
    }

    try {
      setIsCreating(true);
      setError(null);

      const response = await createDeploy({
        projectName: 'penguin-land',
      });

      console.log('[Deploy] 📦 Created deployment:', response);
      setSessionId(response.sessionId);

      console.log('[Deploy] 🎬 Starting polling...');
      startPolling();

      setToast({
        message: 'デプロイが開始されました！',
        type: 'success',
      });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'デプロイ開始に失敗しました'
      );
      setToast({
        message: 'デプロイ開始に失敗しました',
        type: 'error',
      });
    } finally {
      setIsCreating(false);
    }
  };

  /**
   * デプロイ完了時にリソースを照会
   */
  useEffect(() => {
    if (deployState === 'COMPLETE' && sessionId) {
      const fetchResources = async () => {
        try {
          const resData = await getResources(sessionId);
          setResources(resData.resources);

          // ペンギンスペシャルセレブレーション！ 🐧🎉
          penguinCelebration();
          setToast({
            message: '🎉 デプロイが完了しました！',
            type: 'success',
          });
        } catch (error) {
          console.error('Failed to fetch resources:', error);
          setError('リソース情報の取得に失敗しました');
        }
      };
      fetchResources();
    }
  }, [deployState, sessionId, setResources, setError]);

  /**
   * デプロイの削除
   */
  const handleDestroy = async () => {
    if (!sessionId) {
      return;
    }

    // eslint-disable-next-line no-alert
    if (
      window.confirm(
        '本当にすべてのリソースを削除しますか？\nこの操作は元に戻せません。'
      )
    ) {
      try {
        setIsDestroying(true);
        setError(null);
        await destroyDeploy(sessionId);

        // 状態の初期化とページ遷移
        reset();
        navigate(PATHS.MAIN);

        setToast({
          message: 'リソースの削除が完了しました',
          type: 'success',
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : '削除に失敗しました');
        setToast({
          message: 'リソースの削除に失敗しました',
          type: 'error',
        });
      } finally {
        setIsDestroying(false);
      }
    }
  };

  /**
   * 再試行
   */
  const handleRetry = () => {
    if (sessionId) {
      reset();
      handleCreate();
    }
  };

  const isInProgress =
    deployState === 'APPLYING' ||
    deployState === 'PLANNING' ||
    (sessionId && deployState === 'INIT');
  const isComplete = deployState === 'COMPLETE';
  const isFailed = deployState === 'FAILED';

  return (
    <Layout>
      {isDestroying && (
        <FullScreenLoader>
          <LoadingSpinner message="リソースを削除しています..." />
        </FullScreenLoader>
      )}

      <Container>
        <Header>
          <Title>🚀 デプロイコンソール</Title>
          <ButtonGroup>
            {isComplete && (
              <Button onClick={() => navigate(PATHS.DASHBOARD)}>
                ダッシュボードへ移動
              </Button>
            )}
            {isFailed && <Button onClick={handleRetry}>再試行</Button>}
            {(isComplete || isFailed) && (
              <Button
                variant="danger"
                onClick={handleDestroy}
                disabled={isDestroying}
              >
                {isDestroying ? '削除中...' : 'すべて削除'}
              </Button>
            )}
          </ButtonGroup>
        </Header>

        {!sessionId && deployState === 'INIT' && (
          <EmptyState>
            <EmptyIcon>🐧</EmptyIcon>
            <EmptyTitle>デプロイを開始する準備ができました</EmptyTitle>
            <EmptyDescription>
              ボタンをクリックすると、7種類のAWSリソースが自動的に作成されます。
              <br />
              デプロイには約5〜10分かかります。
            </EmptyDescription>
            <Button size="large" onClick={handleCreate} disabled={isCreating}>
              {isCreating ? '作成中...' : 'デプロイ開始'}
            </Button>
          </EmptyState>
        )}

        {(sessionId || isInProgress || isComplete || isFailed) && (
          <>
            <Card>
              <ProgressBar
                progress={progress}
                state={deployState}
                currentStage={currentStage}
              />
            </Card>

            {isInProgress && (
              <LoadingSpinner message="デプロイが進行中です..." />
            )}

            {logs.length > 0 && <LogViewer logs={logs} />}

            {resources && <ResourcePanel resources={resources} />}

            {error && (
              <ErrorCard>
                <ErrorIcon>❌</ErrorIcon>
                <ErrorMessage>{error}</ErrorMessage>
              </ErrorCard>
            )}
          </>
        )}
      </Container>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </Layout>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.color.baseColor2};
  margin: 0;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.color.white};
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
`;

const EmptyIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 1rem;
`;

const EmptyTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.color.baseColor2};
  margin: 0 0 0.75rem 0;
`;

const EmptyDescription = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.color.baseColor5};
  margin: 0 0 2rem 0;
  text-align: center;
  line-height: 1.6;
`;

const ErrorCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.color.dangerLight};
  border-radius: 8px;
  border-left: 4px solid ${({ theme }) => theme.color.danger};
`;

const ErrorIcon = styled.div`
  font-size: 2rem;
`;

const ErrorMessage = styled.p`
  margin: 0;
  font-size: 1rem;
  color: ${({ theme }) => theme.color.danger};
  font-weight: 500;
`;

const FullScreenLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;
