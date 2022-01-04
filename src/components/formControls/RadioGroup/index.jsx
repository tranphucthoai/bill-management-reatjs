import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

RadioGroup.propTypes = {
  selectedItem: PropTypes.number,
  value: PropTypes.array,
  nameGroup: PropTypes.string,
  handleChange: PropTypes.func,
};

function RadioGroup({ value = [], nameGroup = '', selectedItem = 0, handleChange = null }) {
  return (
    <ul className="radio-group mb-3">
      {value?.map((item, index) => (
        <li key={index}>
          <div className="radio-normal">
            <input
              className="radio-normal__input"
              value={item.name}
              name={nameGroup}
              type="radio"
              id={item.name}
              hidden
              defaultChecked={item.isChecked}
              onClick={() => handleChange(index, nameGroup)}
            />
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
