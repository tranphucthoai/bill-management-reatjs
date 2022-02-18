import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Pagination } from 'react-bootstrap';

PaginationNormal.propTypes = {
  pagination: PropTypes.object,
  onChange: PropTypes.func,
};

function PaginationNormal({ pagination: { _totalRows: total, _limit: limit, _page: page } = {}, onChange = null }) {
  let items = [];
  for (let number = 1; number <= Math.ceil(total / limit); number++) {
    items.push(
      <Pagination.Item key={number} active={number === page} onClick={() => onChange(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <Pagination className="justify-content-center mb-4">{items}</Pagination>
    </div>
  );
}

export default PaginationNormal;
