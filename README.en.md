# 🐧 Penguin-Land

<div align="center">

**One-Click Terraform-Based AWS Deployment with Adorable Penguin Coaching Monitoring**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Language:** [🇯🇵 日本語](README.md) | [🇰🇷 한국어](README.ko.md) | [🇺🇸 English](README.en.md)

</div>

---

## 📝 Project Overview

**Penguin-Land** is a service that provides one-click AWS infrastructure deployment using Terraform and gamified monitoring through an adorable penguin character.

### 🎯 Hackathon Theme

Our goal is to make cloud infrastructure deployment easy even for DevOps beginners and help them intuitively understand system status.

---

## ✨ Key Features

### 1. 🚀 One-Click Deployment

- Automatically create 7 types of AWS resources with a single button click
- Terraform Plan visualization
- Real-time log display
- Automatic rollback functionality

**AWS Resources Created:**

- EC2 Instance (t2.micro)
- VPC (Network isolation)
- DynamoDB (NoSQL database)
- S3 (Static file storage)
- Lambda (Event processing)
- CloudWatch (Logs & Monitoring)
- SNS (Notification service)

### 2. 🐧 Penguin Coaching

The penguin's expression changes according to the system status, allowing you to intuitively understand the current state.

- **😊 Happy**: System is stable
- **😐 Worried**: Requires some attention
- **😢 Crying**: Needs urgent response

### 3. 📊 Real-time Monitoring

Monitor CloudWatch-based metrics in real-time and automatically detect anomalies.

**Monitoring Metrics:**

- CPU Usage
- Latency (Response time)
- Error Rate

### 4. 🎮 Simulation Mode

You can simulate the following scenarios for demo purposes:

- **CPU Spike**: CPU usage suddenly rises to 85%
- **High Latency**: Response time increases to 850ms
- **Error Burst**: Error rate suddenly rises to 8%

---

## 🛠️ Tech Stack

### Frontend

- **React 19** - Latest React framework
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool
- **Styled Components** - CSS-in-JS
- **React Router v7** - Routing

### State Management & Data Fetching

- **Zustand** - Lightweight state management
- **TanStack Query** - Server state management
- **Axios** - HTTP client

### UI/UX

- **Lottie** - Smooth animations
- **Canvas Confetti** - Celebration effects
- **Noto Sans JP** - Japanese font

### Development Tools

- **MSW (Mock Service Worker)** - API mocking
- **ESLint** - Code quality
- **Prettier** - Code formatting

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd service-client

# Install dependencies
pnpm install

# Configure environment variables
cp .env.example .env
# Edit the .env file to configure MSW on/off

# Start development server
pnpm dev
```

### Environment Variables

You can configure the following settings in the `.env` file:

| Variable | Description | Default Value |
|----------|-------------|---------------|
| `VITE_ENABLE_MSW` | Enable MSW mocking<br/>`true`: Use mock API<br/>`false`: Use real backend API | `true` |
| `VITE_API_BASE_URL` | Backend API base URL<br/>(Used when MSW is disabled) | `http://localhost:8000` |

**Example: Disable MSW and use real backend**

```env
VITE_ENABLE_MSW=false
VITE_API_BASE_URL=http://localhost:8000
```

### Access

Open your browser and navigate to `http://localhost:3000`.

---

## 📦 Project Structure

```
service-client/
├── src/
│   ├── api/               # API communication
│   ├── components/        # React components
│   │   ├── common/       # Common components
│   │   ├── dashboard/    # Dashboard
│   │   ├── deploy/       # Deployment
│   │   └── pages/        # Pages
│   ├── hooks/            # Custom hooks
│   ├── mocks/            # MSW mocks
│   ├── stores/           # Zustand stores
│   ├── types/            # TypeScript type definitions
│   ├── utils/            # Utility functions
│   └── theme/            # Theme configuration
├── public/               # Static files
└── index.html           # Entry point
```

---

## 🎨 Design Features

### 🌈 Color Scheme

- **Primary**: `#3B82F6` (Blue)
- **Healthy**: `#22C55E` (Green)
- **Warning**: `#F59E0B` (Orange)
- **Danger**: `#EF4444` (Red)

### 💫 Animations

- Spectacular fireworks effect on deployment completion
- Adorable penguin animations
- Smooth page transitions

---

## 🧪 Development Mode

### MSW (Mock Service Worker)

We mock APIs using MSW to enable frontend development without a backend.

**Deployment Simulation:**

- 0s: Initialization (0%)
- 5s: Planning phase (10%)
- 15s: Resource creation begins (30%)
- 30s: In progress (60%)
- 45s: Complete (100%) 🎉

### Environment Variables

```env
# .env.development
VITE_ENABLE_MOCK=true
VITE_API_BASE_URL=http://localhost:8000
```

---

## 📱 Main Screens

### 1. Landing Page (`/`)

Displays project introduction and main features.

### 2. Deployment Console (`/deploy`)

- One-click deployment
- Real-time progress display
- Log viewer
- Resource information display
- Delete all resources functionality

### 3. Monitoring Dashboard (`/dashboard`)

- Penguin coaching
- Metric cards (CPU, Latency, Error Rate)
- Alert list
- Simulation panel

---

## 🎯 Future Expansion Plans

- [ ] Automatically generate not only resources but also CI/CD pipelines with Terraform
- [ ] Develop CloudWatch dashboard using Grafana

---

## 👥 Team

**Penguin-Land Team**

- Software Engineer × 4

---

## 📄 License

MIT License

---

## 🙏 Acknowledgments

This project was developed for a hackathon.
We aim to make the world of DevOps more approachable and enjoyable.

---

<div align="center">

**Made with ❤️ and 🐧**

</div>
