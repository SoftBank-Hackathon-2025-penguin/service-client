import type { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'danger' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $variant: 'primary' | 'danger' | 'secondary';
  $size: 'small' | 'medium' | 'large';
  $fullWidth: boolean;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ $size }) => {
    switch ($size) {
      case 'small':
        return css`
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        `;
      case 'large':
        return css`
          padding: 1rem 2rem;
          font-size: 1.125rem;
        `;
      default:
        return css`
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
        `;
    }
  }}

  ${({ $variant, theme }) => {
    switch ($variant) {
      case 'danger':
        return css`
          background: ${theme.color.danger};
          color: ${theme.color.white};

          &:hover:not(:disabled) {
            background: #dc2626;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
          }
        `;
      case 'secondary':
        return css`
          background: ${theme.color.baseColor8};
          color: ${theme.color.baseColor2};

          &:hover:not(:disabled) {
            background: ${theme.color.baseColor7};
            transform: translateY(-1px);
          }
        `;
      default:
        return css`
          background: ${theme.color.primary};
          color: ${theme.color.white};

          &:hover:not(:disabled) {
            background: #2563eb;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
          }
        `;
    }
  }}

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

