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
  customOnChange: PropTypes.func,
  customOnBlur: PropTypes.func,
  readOnly: PropTypes.bool,
};

function TextField({
  icon = '',
  placeholder = '',
  form = {},
  name = '',
  type = 'text',
  customOnBlur = null,
  customOnChange = null,
  readOnly = false,
}) {
  return (
    <InputGroup hasValidation className={clsx('input-normal', !!form.errors[name] ? 'mb-2' : 'mb-4')}>
      <InputGroup.Text className="input-group-text">
        <i className={clsx('fa', icon)}></i>
      </InputGroup.Text>
      <Form.Control
        readOnly={readOnly}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={(e) => {
          form.handleChange(e);
          customOnChange(e.target.value, name);
        }}
        onBlur={(e) => {
          form.handleBlur(e);
          if (!customOnBlur) return;
          customOnBlur(e.target.value, name);
        }}
        onKeyUp={(e) => {
          customOnChange(e.target.value, name);
        }}
        value={form.values[name]}
        isInvalid={!!form.errors[name]}
        feedback={form.errors[name]}
        feedbacktype="invalid"
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
