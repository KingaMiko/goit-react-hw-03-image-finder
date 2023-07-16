import React from 'react';

const Modal = ({ src, onClose }) => (
  <div className="overlay" onClick={onClose}>
    <div className="modal">
      <img src={src} alt="Selected" />
    </div>
  </div>
);

export default Modal;
