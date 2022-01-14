import React from 'react';
import { Col, Row } from 'react-bootstrap';
import BillForm from '../components/billForm';
import './style.scss';

TransferBill.propTypes = {};

function TransferBill(props) {
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

export default TransferBill;
