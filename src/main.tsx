import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import GlobalStyle from './theme/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './theme/theme.ts';
import { PATHS } from './constants/paths.ts';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Landing } from './components/pages/Landing.tsx';
import { DeployPage } from './components/pages/DeployPage.tsx';
import { Dashboard } from './components/pages/Dashboard.tsx';
import { NotFound } from './components/common/NotFound.tsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/**
 * MSW初期化
 */
async function enableMocking() {
  // 開発環境では常にMSWを有効化
  if (import.meta.env.DEV) {
    console.log('[MSW] 🐧 Starting Mock Service Worker...');
    console.log('[MSW] Environment:', {
      VITE_ENABLE_MOCK: import.meta.env['VITE_ENABLE_MOCK'],
      DEV: import.meta.env.DEV,
      MODE: import.meta.env.MODE,
    });

    const { worker } = await import('./mocks/browser');

    // Service Workerの開始
    return worker.start({
      onUnhandledRequest: 'warn',
      serviceWorker: {
        url: '/mockServiceWorker.js',
      },
    }).then(() => {
      console.log('[MSW] ✅ Mocking enabled successfully!');
    });
  }
}

/**
 * ルーティングが追加されるたびに追加
 */
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: PATHS.DEPLOY,
        element: <DeployPage />,
      },
      {
        path: PATHS.DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

// MSW初期化後にアプリをレンダリング
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <RouterProvider router={router} />
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
});
