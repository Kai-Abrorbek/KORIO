import { create } from "zustand";
import type { AlertButton, AlertOptions } from "react-native";

export interface AppDialog {
  id: number;
  title: string;
  message?: string;
  buttons: AlertButton[];
  options?: AlertOptions;
}

interface AppDialogState {
  queue: AppDialog[];
  present: (
    title: string,
    message: string | undefined,
    buttons: AlertButton[],
    options?: AlertOptions,
  ) => void;
  choose: (id: number, index: number) => void;
  dismiss: (id: number) => void;
}

let nextId = 0;
export const useAppDialogStore = create<AppDialogState>((set, get) => ({
  queue: [],
  present: (title, message, buttons, options) => {
    set((state) => ({
      queue: [
        ...state.queue,
        { id: ++nextId, title, message, buttons, options },
      ],
    }));
  },
  choose: (id, index) => {
    const current = get().queue[0];
    const button = current?.buttons[index];
    if (!current || current.id !== id || !button) return;
    set((state) => ({ queue: state.queue.slice(1) }));
    button.onPress?.();
  },
  dismiss: (id) => {
    const current = get().queue[0];
    if (!current || current.id !== id || !current.options?.cancelable) return;
    set((state) => ({ queue: state.queue.slice(1) }));
    current.options.onDismiss?.();
  },
}));
