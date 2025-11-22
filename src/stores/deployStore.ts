import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type {
  DeployState,
  DeployStatusResponse,
  ResourceInfo,
} from '../types/deploy';

interface DeployStore {
  // State
  sessionId: string | null;
  deployState: DeployState;
  progress: number;
  currentStage: string;
  logs: string[];
  resources: ResourceInfo | null;
  isPolling: boolean;
  error: string | null;

  // Actions
  setSessionId: (id: string) => void;
  setDeployState: (state: DeployState) => void;
  updateStatus: (status: DeployStatusResponse) => void;
  setResources: (resources: ResourceInfo) => void;
  setPolling: (isPolling: boolean) => void;
  setError: (error: string | null) => void;
  addLog: (log: string) => void;
  reset: () => void;
}

const initialState = {
  sessionId: null,
  deployState: 'INIT' as DeployState,
  progress: 0,
  currentStage: '',
  logs: [],
  resources: null,
  isPolling: false,
  error: null,
};

export const useDeployStore = create<DeployStore>()(
  immer((set) => ({
    ...initialState,

    setSessionId: (id) =>
      set((state) => {
        state.sessionId = id;
      }),

    setDeployState: (deployState) =>
      set((state) => {
        state.deployState = deployState;
      }),

    updateStatus: (status) =>
      set((state) => {
        state.deployState = status.state;
        state.progress = status.progress;
        state.currentStage = status.currentStage;
        state.logs = status.logs;
      }),

    setResources: (resources) =>
      set((state) => {
        state.resources = resources;
      }),

    setPolling: (isPolling) =>
      set((state) => {
        state.isPolling = isPolling;
      }),

    setError: (error) =>
      set((state) => {
        state.error = error;
      }),

    addLog: (log) =>
      set((state) => {
        state.logs.push(log);
      }),

    reset: () =>
      set(() => ({
        ...initialState,
      })),
  }))
);

