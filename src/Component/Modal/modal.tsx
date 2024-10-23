import React from "react";
import { ButtonDeleted, ButtonModal } from "./styles";

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
        <ButtonDeleted onClick={onConfirm}>Confirmar</ButtonDeleted>
        <ButtonModal onClick={onClose}>Cancelar</ButtonModal>
      </div>
    </div>
  );
};

export default ConfirmModal;