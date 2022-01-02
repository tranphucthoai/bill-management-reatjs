import React from 'react';
import PropTypes from 'prop-types';
import { InputGroup, FormControl, Button } from "react-bootstrap";
import './style.scss'

TextFieldBtn.propTypes = {

};

function TextFieldBtn({ placeholder }) {
    return (
        <InputGroup className='search-normal'>
            <FormControl className='search-normal__input'
                placeholder={placeholder}
                aria-label=""
            />
            <Button variant="outline-secondary" className='btn-reset search-normal__delete'>
                <i className='fa fa-times'></i>
            </Button>
            <Button variant="outline-secondary" className='btn-reset search-normal__submit'>
                <i className='fa fa-search'></i>
            </Button>
        </InputGroup>
    );
}

export default TextFieldBtn;