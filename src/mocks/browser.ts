import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

/**
 * MSWブラウザワーカーの設定
 * 開発環境でAPIをモックします
 */
export const worker = setupWorker(...handlers);

