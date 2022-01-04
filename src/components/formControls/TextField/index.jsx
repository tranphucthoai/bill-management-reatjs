import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import './style.scss';
// import clsx from 'clsx';
import { formatPrice } from './../../../constans/common';

TextField.propTypes = {
  form: PropTypes.object,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
};

function TextField({ icon = '', placeholder = '', form = {}, name = '', type = 'text' }) {
  return (
    <InputGroup hasValidation className={clsx('input-normal', !!form.errors[name] ? 'mb-2' : 'mb-4')}>
      <InputGroup.Text className="input-group-text">
        <i className={clsx('fa', icon)}></i>
      </InputGroup.Text>
      <Form.Control
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
        value={form.values[name]}
        isInvalid={!!form.errors[name]}
        feedback={form.errors[name]}
        feedbackType="invalid"
        id={name}
      />
      {form.errors[name] ? (
        <Form.Control.Feedback type="invalid">{form.errors[name]}</Form.Control.Feedback>
      ) : (
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
      )}
    </InputGroup>
  );
}

export default TextField;
