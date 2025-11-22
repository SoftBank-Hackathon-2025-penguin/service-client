import { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export const Toast = ({
  message,
  type = 'info',
  onClose,
  duration = 3000,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3秒後に自動で閉じる

    return () => {
      clearTimeout(timer);
    };
  }, [onClose, duration]);

  const icon = {
    success: '✅',
    error: '❌',
    info: 'ℹ️',
  }[type];

  return (
    <Container $type={type}>
      <Icon>{icon}</Icon>
      <Message>{message}</Message>
      <CloseButton onClick={onClose}>×</CloseButton>
    </Container>
  );
};

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const Container = styled.div<{ $type: 'success' | 'error' | 'info' }>`
  position: fixed;
  top: 2rem;
  right: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.color.white};
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  animation: ${slideIn} 0.3s ease;
  z-index: 1000;
  min-width: 300px;
  max-width: 500px;

  ${({ $type, theme }) => {
    switch ($type) {
      case 'success':
        return css`
          border-left: 4px solid ${theme.color.healthy};
        `;
      case 'error':
        return css`
          border-left: 4px solid ${theme.color.danger};
        `;
      default:
        return css`
          border-left: 4px solid ${theme.color.primary};
        `;
    }
  }}
`;

const Icon = styled.span`
  font-size: 1.25rem;
`;

const Message = styled.p`
  flex: 1;
  margin: 0;
  font-size: 0.9375rem;
  color: ${({ theme }) => theme.color.baseColor2};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  color: ${({ theme }) => theme.color.baseColor5};
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.color.baseColor2};
  }
`;
