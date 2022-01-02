import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { InputGroup, FormControl } from "react-bootstrap";
import clsx from 'clsx'

TextField.propTypes = {

};

function TextField({ icon, placeholder }) {
    return (
        <InputGroup className="mb-3 input-normal">
            <InputGroup.Text id="basic-addon1">
                <i className={clsx("fa", icon)}></i>
            </InputGroup.Text>
            <FormControl
                placeholder={placeholder}
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
        </InputGroup>
    );
}

export default TextField;