import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Modal = ({ children, closeModal }) => (
  <div className="modal-wrapper">
    <div className="modal">
      <div className="close-button-container">
        <i className="fas fa-times close" onClick={closeModal}></i>
      </div>
      <div className="modal-content">{children}</div>
    </div>
  </div>
);

Modal.propTypes = {
  children: PropTypes.node,
  closeModal: PropTypes.func,
};

Modal.defaultProps = {
  children: '',
  closeModal: () => {},
};

export default Modal;
