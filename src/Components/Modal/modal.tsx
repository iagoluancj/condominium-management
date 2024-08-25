import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message: string;
}

const ConfirmModal: React.FC<ModalProps> = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <p>{message}</p>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
};

export default ConfirmModal;