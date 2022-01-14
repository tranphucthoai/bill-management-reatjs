import React from 'react';
import { Col, Row } from 'react-bootstrap';
import TransferBillForm from '../components/TransferBillForm/index';
import './style.scss';

TransferBill.propTypes = {};

function TransferBill(props) {
  return (
    <section className="main-col">
      <Row>
        <Col xs={12}>
          <TransferBillForm />
        </Col>
      </Row>
    </section>
  );
}

export default TransferBill;
