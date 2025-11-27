import { useModalStore } from "@/store/ui/modal-store";
import { modalRegistry } from "@/components";

type ModalType = Exclude<keyof typeof modalRegistry, null>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openCheck = (props: any, onCloseCallback?: () => void) =>
    openModal("check", props, onCloseCallback);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openError = (props: any, onCloseCallback?: () => void) =>
    openModal("error", props, onCloseCallback);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openWarning = (props: any, onCloseCallback?: () => void) =>
    openModal("warning", props, onCloseCallback);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openRequest = (props: any, onCloseCallback?: () => void) =>
    openModal("request", props, onCloseCallback);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openCancelRequest = (props: any, onCloseCallback?: () => void) =>
    openModal("cancelRequest", props, onCloseCallback);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openRequestDetails = (props: any, onCloseCallback?: () => void) =>
    openModal("requestDetails", props, onCloseCallback);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const openConfirmedTutoring = (props: any, onCloseCallback?: () => void) =>
    openModal("confirmTutoring", props, onCloseCallback);

  return {
    open,
    close,
    openCheck,
    openError,
    openWarning,
    openRequest,
    openCancelRequest,
    openRequestDetails,
    openConfirmedTutoring,
    currentType: type,
    isOpen,
  };
};
