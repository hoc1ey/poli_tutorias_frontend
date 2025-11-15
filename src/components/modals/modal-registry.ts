import { CheckModal, ErrorModal, RequestModal, WarningModal } from "@/components";

export const modalRegistry: Record<string, React.FC<any>> = {
  check: CheckModal,
  error: ErrorModal,
  warning: WarningModal,
  request: RequestModal,
};
