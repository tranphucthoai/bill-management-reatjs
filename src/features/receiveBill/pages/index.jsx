import React from 'react';
import { Col, Row } from 'react-bootstrap';
import ReceiveBillForm from './../components/ReceiveBillForm/index';

ReceiveBill.propTypes = {};

function ReceiveBill(props) {
  return (
    <section className="main-col">
      <Row>
        <Col xs={12}>
          <ReceiveBillForm />
        </Col>
      </Row>
    </section>
  );
}

export default ReceiveBill;
