import { CancelRequestModal, CheckModal, ConfirmedTutoringModal, ErrorModal, RequestDetailsModal, RequestModal, WarningModal } from "@/components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const modalRegistry: Record<string, React.FC<any>> = {
  check: CheckModal,
  error: ErrorModal,
  warning: WarningModal,
  request: RequestModal,
  cancelRequest: CancelRequestModal,
  requestDetails: RequestDetailsModal,
  confirmTutoring: ConfirmedTutoringModal,
};
