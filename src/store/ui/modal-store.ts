import { create } from "zustand";
import { modalRegistry } from "@/components";

export type ModalType = keyof typeof modalRegistry | null;

interface ModalState {
  type: ModalType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any;
  isOpen: boolean;
  onCloseCallback?: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  openModal: (type: Exclude<ModalType, null>, props?: any, onCloseCallback?: () => void) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set, get) => ({
  type: null,
  props: {},
  isOpen: false,
  onCloseCallback: undefined,

  openModal: (type, props = {}, onCloseCallback) =>
    set({ type, props, isOpen: true, onCloseCallback }),

  closeModal: () => {
    const { onCloseCallback } = get();
    onCloseCallback?.();
    set({ type: null, props: {}, isOpen: false, onCloseCallback: undefined });
  },
}));
