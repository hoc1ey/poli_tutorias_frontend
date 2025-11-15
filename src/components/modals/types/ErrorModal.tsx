import { AiOutlineClose } from 'react-icons/ai';
import { PiXCircleLight } from 'react-icons/pi';
import '../Modal.css';

interface ErrorModalProps {
  title?: string;
  message: string;
  btnText: string;
  onConfirm?: () => void;
  onClose: () => void;
}

export const ErrorModal = ({ title, message, btnText, onConfirm, onClose }: ErrorModalProps) => {
  return (
    <div className="modal-container">
      <div className='modal-icon-container'>
        <PiXCircleLight size={68} className='text-black' />
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
          {btnText}
        </button>
      </div>
    </div>
  )
}
