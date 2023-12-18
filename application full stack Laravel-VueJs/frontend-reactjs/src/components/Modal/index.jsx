import React from "react";
import { createPortal } from "react-dom";

const Modal = ({ children, isOpen, closeModal }) => {
  return (
    <>
      {isOpen &&
        createPortal(
          <dialog open onClose={closeModal}>
            <button onClick={closeModal}>Fermer</button>
            {children}
          </dialog>,
          document.body
        )}
    </>
  );
};

export default Modal;
