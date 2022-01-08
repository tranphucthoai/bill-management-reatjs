import React from 'react';
import { Col, Row } from 'react-bootstrap';
import BillForm from '../components/billForm';
import './style.scss';

TransfersBill.propTypes = {};

function TransfersBill(props) {
  localStorage.setItem('userID', 'ThaiBinhDuong');
  return (
    <section className="main-col">
      <Row>
        <Col xs={12}>
          <BillForm />
        </Col>
      </Row>
    </section>
  );
}

export default TransfersBill;
