import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info';

interface ToastState {
  message: string | null;
  type: ToastType;
  isVisible: boolean;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

/**
 * 全局Toastストア
 * ページ遷移後もToastを表示できるように管理
 */
export const useToastStore = create<ToastState>((set) => ({
  message: null,
  type: 'info',
  isVisible: false,

  showToast: (message: string, type: ToastType) => {
    set({ message, type, isVisible: true });
  },

  hideToast: () => {
    set({ isVisible: false, message: null });
  },
}));
