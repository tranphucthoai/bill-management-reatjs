import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import './style.scss';

TextField.propTypes = {
  form: PropTypes.object,
  icon: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  customInput: PropTypes.func,
  readOnly: PropTypes.bool,
};

function TextField({
  icon = '',
  placeholder = '',
  form = {},
  name = '',
  type = 'text',
  customInput = null,
  readOnly = false,
}) {
  return (
    <InputGroup
      hasValidation
      className={clsx('input-normal', !!form.errors[name] && form.touched[name] ? 'mb-2' : 'mb-4')}
    >
      <InputGroup.Text className="input-group-text">
        <i className={clsx('fa', icon)}></i>
      </InputGroup.Text>
      <Form.Control
        readOnly={readOnly}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          if (customInput) customInput();
          form.handleChange(e);
        }}
        onBlur={(e) => {
          if (customInput) customInput();
          form.handleBlur(e);
        }}
        onKeyUp={(e) => {
          if (customInput) customInput();
        }}
        value={form.values[name]}
        isInvalid={!!form.errors[name] && form.touched[name]}
        feedback={form.errors[name]}
        feedbacktype="invalid"
        id={name}
      />
      {form.errors[name] && form.touched[name] ? (
        <Form.Control.Feedback type="invalid">{form.errors[name]}</Form.Control.Feedback>
      ) : (
        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
      )}
    </InputGroup>
  );
}

export default TextField;
