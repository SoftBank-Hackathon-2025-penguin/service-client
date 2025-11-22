import { setupServer } from 'msw/node';
import { handlers } from './handlers';

/**
 * MSW Nodeサーバーの設定
 * テスト環境でAPIをモックします
 */
export const server = setupServer(...handlers);

