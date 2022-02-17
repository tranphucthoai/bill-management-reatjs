import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { ToastContainer, Toast } from 'react-bootstrap';

ToastNormal.propTypes = {
  hideToast: PropTypes.func,
};

function ToastNormal({ fieldToast: { type, title, massage }, showToast, hideToast }) {
  return (
    <ToastContainer position="top-end" className="p-3 toast-normal">
      <Toast onClose={hideToast} show={showToast} delay={4000} autohide bg={type} animation>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">{title}</strong>
          {/* <small>11 mins ago</small> */}
        </Toast.Header>
        <Toast.Body>{massage}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastNormal;
