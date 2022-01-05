import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import BillForm from '../components/billForm';
import BillTable from '../components/billTable';
import { create } from '../transfersBillSlice';
import './style.scss';

TransfersBill.propTypes = {};

function TransfersBill(props) {
  const dispatch = useDispatch();
  const handleAdd = () => {
    dispatch(create());
  };
  return (
    <section className="main-col">
      <Row>
        <Col xs={12}>
          <div className="main-col__box d-flex justify-content-between">
            <h2 className="main-col__heading">Hóa đơn chuyển tiền</h2>
            <div className="btn-group">
              <button onClick={handleAdd} className="ms-auto btn-reset bg-yellow color-blue btn btn-md">
                <i className="fa fa-plus"></i>
              </button>
            </div>
          </div>
        </Col>
        <Col xs={12}>
          <BillForm />
          <BillTable />
        </Col>
      </Row>
    </section>
  );
}

export default TransfersBill;
