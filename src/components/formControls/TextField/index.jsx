import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'
import { InputGroup, FormControl } from "react-bootstrap";
import clsx from 'clsx'
import { Controller } from 'react-hook-form';

TextField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disable: PropTypes.bool,
    icon: PropTypes.string,
    placeholder: PropTypes.string,
};

function TextField(props) {
    const { form, name = "", label, disable, icon, placeholder } = props;
    const { formState: { errors } } = form;
    const hasError = !!errors[name];
    return (
        <Controller
            className="mb-4 input-normal"
            control={form.control}
            name={name}
            render={({
                field: { onChange, onBlur, value, name },
            }) => (
                <TextField
                    id={name}
                    onBlur={onBlur}
                    onChange={onChange}
                    label={label}
                    name={name}
                    value={value}
                // disabled={disable}
                // error={hasError}
                // helperText={errors[name]?.message}
                >
                    <InputGroup.Text id="basic-addon1" >
                        <i className={clsx("fa", icon)}></i>
                    </InputGroup.Text>
                    <FormControl
                        placeholder={placeholder}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                    />
                </TextField>
            )}
        >
        </Controller>
    );
}

export default TextField;