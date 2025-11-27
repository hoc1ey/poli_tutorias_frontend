import { AiOutlineClose } from 'react-icons/ai';
import { PiWarningCircleLight } from 'react-icons/pi';
import '../Modal.css';

interface WarningModalProps {
  title?: string;
  message: string;
  confirmBtnText: string;
  cancelBtnText: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  onClose: () => void;
}

export const WarningModal = ({ title, message, confirmBtnText, cancelBtnText, onConfirm, onCancel, onClose }: WarningModalProps) => {
  return (
    <div className="modal-container">
      <div className='modal-icon-container'>
        <PiWarningCircleLight size={68} className='bg-(--light-yellow) rounded-full text-(--dark-orange)' />
      </div>

      <button
        className="modal-close-button"
        onClick={onClose}
      >
        <AiOutlineClose size={22} />
      </button>

      {title && <h2 className="modal-title">{title}</h2>}

      <p className="modal-message">
        {message}
      </p>

      <div className="modal-buttons-container">
        <button
          onClick={() => {
            onConfirm?.()
            onClose()
          }}
          className="modal-button btn-dark-blue"
        >
          {confirmBtnText}
        </button>
        <button
          onClick={() => {
            onCancel?.()
            onClose()
          }}
          className="modal-button btn-dark-yellow"
        >
          {cancelBtnText}
        </button>
      </div>
    </div>
  )
}
