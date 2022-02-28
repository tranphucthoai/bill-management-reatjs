import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { show } from '../MenuMobile/menuMoblieSlice';

Heading.propTypes = {
  title: PropTypes.string,
  handleAdd: PropTypes.func,
};

function Heading({ title = '', handleAdd = null }) {
  const dispatch = useDispatch();
  const handleShowMenu = () => {
    dispatch(show());
  };
  return (
    <Row>
      <Col xs={12}>
        <div className="main-col__box d-flex justify-content-between">
          <div onClick={handleShowMenu} className="btn-reset btn btn-md bg-white me-4 d-block d-xl-none">
            <i className="fa fa-bars"></i>
          </div>
          <h2 className="main-col__heading flex-fill">{title}</h2>
          <div className="btn-group">
            <div onClick={handleAdd} className="ms-auto btn-reset bg-yellow color-blue btn btn-md">
              <i className="fa fa-plus"></i>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default Heading;
