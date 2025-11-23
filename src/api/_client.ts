import axios, { AxiosError } from 'axios';
import { BASE_URL } from '../constants/api';

// TODO: axiosインスタンス作成（例として設定、今後バックエンドに合わせて変更が必要）
const client = axios.create({ baseURL: BASE_URL });

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError): Promise<never> | void => {
    if (error.response?.status === 401) {
      window.alert('ログインが期限切れです。\n再度ログインしてください。');

      return;
    }

    window.alert('不明なエラーが発生しました。\nしばらくしてから再度お試しください。');

    return Promise.reject(error);
  }
);

export default client;
