# 🐧 Penguin-Land

<div align="center">

**TerraformベースのワンクリックAWS配布とペンギンのかわいいコーチングモニタリング**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**言語 / Language:** [🇯🇵 日本語](README.md) | [🇰🇷 한국어](README.ko.md) | [🇺🇸 English](README.en.md)

</div>

---

## 📝 プロジェクト概要

**Penguin-Land**は、Terraformを活用してAWSインフラをワンクリックでデプロイし、ペンギンキャラクターによるゲーミフィケーションされたモニタリングを提供するサービスです。

### 🎯 ハッカソンテーマ

DevOps初心者でも簡単にクラウドインフラを構築でき、システムの状態を直感的に理解できるようにすることを目指しました。

---

## ✨ 主な機能

### 1. 🚀 ワンクリックデプロイ

- ボタン一つで7種類のAWSリソースを自動作成
- Terraform Planの可視化
- リアルタイムログ表示
- 自動ロールバック機能

**作成されるAWSリソース:**

- EC2 Instance (t2.micro)
- VPC (ネットワーク分離)
- DynamoDB (NoSQLデータベース)
- S3 (静的ファイルストレージ)
- Lambda (イベント処理)
- CloudWatch (ログ＆モニタリング)
- SNS (通知サービス)

### 2. 🐧 ペンギンコーチング

システムの状態に応じてペンギンの表情が変化し、直感的にステータスを理解できます。

- **😊 Happy**: システムが安定している状態
- **😐 worried**: 少し注意が必要な状態
- **😢 Crying**: 緊急対応が必要な状態

### 3. 📊 リアルタイムモニタリング

CloudWatchベースのメトリクスをリアルタイムで監視し、異常兆候を自動検出します。

**監視項目:**

- CPU使用率
- レイテンシー（応答時間）
- エラー率

### 4. 🎮 シミュレーションモード

デモ用に以下のシナリオをシミュレートできます：

- **CPUスパイク**: CPU使用率が85%に急上昇
- **高レイテンシー**: 応答時間が850msに増加
- **エラーバースト**: エラー率が8%に急上昇

---

## 🛠️ 技術スタック

### フロントエンド

- **React 19** - 最新のReactフレームワーク
- **TypeScript** - 型安全な開発
- **Vite** - 高速なビルドツール
- **Styled Components** - CSS-in-JS
- **React Router v7** - ルーティング

### 状態管理 & データフェッチング

- **Zustand** - 軽量な状態管理
- **TanStack Query** - サーバー状態管理
- **Axios** - HTTPクライアント

### UI/UX

- **Lottie** - 滑らかなアニメーション
- **Canvas Confetti** - お祝いエフェクト
- **Noto Sans JP** - 日本語フォント

### 開発ツール

- **MSW (Mock Service Worker)** - API モッキング
- **ESLint** - コード品質
- **Prettier** - コードフォーマット

---

## 🚀 クイックスタート

### 前提条件

- Node.js 18以上
- pnpm（推奨）または npm

### インストール

```bash
# リポジトリをクローン
git clone <repository-url>
cd service-client

# 依存パッケージをインストール
pnpm install

# 開発サーバーを起動
pnpm dev
```

### アクセス

ブラウザで `http://localhost:3000` にアクセスしてください。

---

## 📦 プロジェクト構成

```
service-client/
├── src/
│   ├── api/               # API通信
│   ├── components/        # Reactコンポーネント
│   │   ├── common/       # 共通コンポーネント
│   │   ├── dashboard/    # ダッシュボード
│   │   ├── deploy/       # デプロイ
│   │   └── pages/        # ページ
│   ├── hooks/            # カスタムフック
│   ├── mocks/            # MSW モック
│   ├── stores/           # Zustand ストア
│   ├── types/            # TypeScript型定義
│   ├── utils/            # ユーティリティ関数
│   └── theme/            # テーマ設定
├── public/               # 静的ファイル
└── index.html           # エントリーポイント
```

---

## 🎨 デザインの特徴

### 🌈 カラースキーム

- **Primary**: `#3B82F6` (ブルー)
- **healthy**: `#22C55E` (グリーン)
- **Warning**: `#F59E0B` (オレンジ)
- **Danger**: `#EF4444` (レッド)

### 💫 アニメーション

- デプロイ完了時の華やかな花火エフェクト
- ペンギンの可愛らしいアニメーション
- スムーズなページ遷移

---

## 🧪 開発モード

### MSW（Mock Service Worker）

バックエンドなしでフロントエンド開発ができるよう、MSWでAPIをモックしています。

**デプロイシミュレーション:**

- 0秒: 初期化 (0%)
- 5秒: 計画フェーズ (10%)
- 15秒: リソース作成開始 (30%)
- 30秒: 進行中 (60%)
- 45秒: 完了 (100%) 🎉

### 環境変数

```env
# .env.development
VITE_ENABLE_MOCK=true
VITE_API_BASE_URL=http://localhost:8000
```

---

## 📱 主な画面

### 1. ランディングページ (`/`)

プロジェクトの紹介と主な機能を表示します。

### 2. デプロイコンソール (`/deploy`)

- ワンクリックデプロイ
- リアルタイム進捗表示
- ログビューアー
- リソース情報表示
- すべて削除機能

### 3. モニタリングダッシュボード (`/dashboard`)

- ペンギンコーチング
- メトリクスカード（CPU、レイテンシー、エラー率）
- アラートリスト
- シミュレーションパネル

---

## 🎯 今後の拡張計画

- [ ] Terraformでリソースだけでなく CI/CD パイプラインまで自動生成
- [ ] Grafana を使用した CloudWatch ダッシュボード開発

---

## 👥 チーム

**Penguin-Land Team**

- Software Engineer × 4名

---

## 📄 ライセンス

MIT License

---

## 🙏 謝辞

このプロジェクトはハッカソンのために開発されました。
DevOpsの世界をより親しみやすく、楽しいものにすることを目指しています。

---

<div align="center">

**Made with ❤️ and 🐧**

</div>
