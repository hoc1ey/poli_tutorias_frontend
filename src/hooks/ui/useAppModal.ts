import { useModalStore } from "@/store/ui/modal-store";
import { modalRegistry } from "@/components";

type ModalType = Exclude<keyof typeof modalRegistry, null>;

interface OpenModalOptions<T = any> {
  type: ModalType;
  props?: T;
  onCloseCallback?: () => void;
}

export const useAppModal = () => {
  const { openModal, closeModal, type, isOpen } = useModalStore();

  const open = <T,>({ type, props, onCloseCallback }: OpenModalOptions<T>) => {
    openModal(type, props, onCloseCallback);
  };

  const close = () => {
    closeModal();
  };

  const openCheck = (props: any, onCloseCallback?: () => void) =>
    openModal("check", props, onCloseCallback);

  const openError = (props: any, onCloseCallback?: () => void) =>
    openModal("error", props, onCloseCallback);

  const openWarning = (props: any, onCloseCallback?: () => void) =>
    openModal("warning", props, onCloseCallback);

  const openRequest = (props: any, onCloseCallback?: () => void) =>
    openModal("request", props, onCloseCallback);

  return {
    open,
    close,
    openCheck,
    openError,
    openWarning,
    openRequest,
    currentType: type,
    isOpen,
  };
};
