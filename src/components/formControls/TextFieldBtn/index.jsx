import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import './style.scss';
import queryString from 'query-string';

TextFieldBtn.propTypes = {
  handleChange: PropTypes.func,
  handleReset: PropTypes.func,
  placeholder: PropTypes.string,
};

function TextFieldBtn({ placeholder = '', handleReset = null, handleChange = null }) {
  const location = useLocation();
  const params = queryString.parse(location.search);
  const [search, setSearch] = useState(params.senderPhone_like || '');
  const onChange = (value) => {
    setSearch(value);
    if (!handleChange) return;
    handleChange(value);
  };
  const onReset = () => {
    if (!handleReset) return;
    handleReset();
    setSearch('');
  };
  return (
    <InputGroup className="search-normal">
      <FormControl
        type="number"
        onChange={(e) => onChange(e.target.value)}
        className="search-normal__input"
        placeholder={placeholder}
        aria-label=""
      />
      <Button onClick={onReset} variant="outline-secondary" className="btn-reset search-normal__delete">
        <i className="fa fa-times"></i>
      </Button>
    </InputGroup>
  );
}

export default TextFieldBtn;
