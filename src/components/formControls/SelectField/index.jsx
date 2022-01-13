import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, Form } from 'react-bootstrap';
import clsx from 'clsx';
SelectField.propTypes = {
  form: PropTypes.object,
  icon: PropTypes.string,
  name: PropTypes.string,
  data: PropTypes.array,
  handleChange: PropTypes.func,
  selectVal: PropTypes.string,
};

function SelectField({ icon = '', form = {}, name = '', data = [], handleChange = null, selectVal = '' }) {
  const onChange = (e) => {
    if (!handleChange) return;
    handleChange(e.target.value);
  };
  return (
    <InputGroup hasValidation className="input-normal mb-3">
      <InputGroup.Text className="input-group-text">
        <i className={clsx('fa', icon)}></i>
      </InputGroup.Text>
      <Form.Control as="select" className="btn-reset" onChange={(e) => onChange(e)} value={selectVal}>
        {/* <Form.Control as="option">Chọn Chi Nhánh</Form.Control> */}
        {data?.map((branch) => (
          <Form.Control key={branch.id} value={branch.id} as="option">
            {branch.id}
          </Form.Control>
        ))}
      </Form.Control>
      <i className="fa fa-caret-down select-icon"></i>
    </InputGroup>
  );
}

export default SelectField;
