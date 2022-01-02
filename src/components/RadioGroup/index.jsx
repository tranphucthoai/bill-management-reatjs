import React from 'react';
import PropTypes from 'prop-types';
import './style.scss'

RadioGroup.propTypes = {

};

function RadioGroup({ value = [], nameGroup = "" }) {
    return (
        <ul className='radio-group'>

            {value?.map(item => (
                <li>
                    <div className='radio-normal'>
                        <input className="radio-normal__input" value={item.name} name={nameGroup} type="radio" id={item.name} hidden checked={item.isChecked} />
                        <label htmlFor={item.name} className="radio-normal__label">
                            {item.text}
                        </label>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default RadioGroup;