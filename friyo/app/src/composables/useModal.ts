import { reactive } from "vue";
import { Modal } from "bootstrap";

interface IUseModal {
  openModal: () => void;
  closeModal: () => void;
}

/**
 * function openModal
 *
 * @param modalId
 */
const openModal = (modalId: string): void => {
  const m = new Modal(document.getElementById(modalId) as Element);
  m.show();
};

/**
 * function closeModal
 *
 * @param modalId
 */
const closeModal = (modalId: string): void => {
  const m = Modal.getInstance(document.getElementById(modalId) as Element);
  m?.hide();
};

export const useModal = (modalId: string): IUseModal => {
  return {
    openModal: () => openModal(modalId),
    closeModal: () => closeModal(modalId),
  };
};
